import { NextResponse } from "next/server";
import { getRazorpayEnvironmentStatus, getRazorpayServerClient, razorpayConfig } from "@/lib/payments/razorpay";
import { getSessionSnapshot } from "@/lib/supabase/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

function buildOrderNumber() {
  return `AS-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function normalizeCartItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => ({
      slug: typeof item?.slug === "string" ? item.slug : "",
      quantity: Number.isFinite(Number(item?.quantity)) ? Math.max(1, Math.floor(Number(item.quantity))) : 1,
    }))
    .filter((item) => item.slug);
}

export async function POST(request) {
  const razorpay = getRazorpayServerClient();
  const razorpayStatus = getRazorpayEnvironmentStatus();
  const supabaseAdmin = createSupabaseAdminClient();
  const session = await getSessionSnapshot();

  if (!razorpay || !razorpayStatus.hasKeyId) {
    return NextResponse.json(
      {
        error: "Razorpay is not configured yet.",
      },
      { status: 503 }
    );
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      {
        error: "Supabase service role credentials are not configured yet.",
      },
      { status: 503 }
    );
  }

  if (!session.user) {
    return NextResponse.json(
      {
        error: "Please log in to continue checkout.",
        loginUrl: "/login?next=%2Fcheckout",
      },
      { status: 401 }
    );
  }

  const body = await request.json().catch(() => null);
  const cartItems = normalizeCartItems(body?.items);

  if (!cartItems.length) {
    return NextResponse.json(
      {
        error: "Your cart is empty.",
      },
      { status: 400 }
    );
  }

  const profileId = (
    await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("id", session.user.id)
      .maybeSingle()
  ).data?.id ?? null;

  const productSlugs = [...new Set(cartItems.map((item) => item.slug))];
  const { data: products, error: productsError } = await supabaseAdmin
    .from("products")
    .select("id, slug, name, base_price, currency")
    .in("slug", productSlugs)
    .eq("status", "active");

  if (productsError || !products?.length) {
    return NextResponse.json(
      {
        error: "Unable to validate the current cart products.",
      },
      { status: 400 }
    );
  }

  const productsBySlug = new Map(products.map((product) => [product.slug, product]));
  const validatedItems = [];

  for (const cartItem of cartItems) {
    const product = productsBySlug.get(cartItem.slug);

    if (!product) {
      return NextResponse.json(
        {
          error: `A cart product is no longer available: ${cartItem.slug}`,
        },
        { status: 400 }
      );
    }

    const unitPrice = Number(product.base_price ?? 0);

    validatedItems.push({
      productId: product.id,
      productName: product.name,
      slug: product.slug,
      quantity: cartItem.quantity,
      unitPrice,
      lineTotal: unitPrice * cartItem.quantity,
      currency: product.currency ?? razorpayConfig.currency,
    });
  }

  const subtotal = validatedItems.reduce((total, item) => total + item.lineTotal, 0);
  const currency = validatedItems[0]?.currency ?? razorpayConfig.currency;

  if (subtotal <= 0) {
    return NextResponse.json(
      {
        error: "Your cart total must be greater than zero.",
      },
      { status: 400 }
    );
  }

  const orderNumber = buildOrderNumber();
  const orderPayload = {
    profile_id: profileId,
    order_number: orderNumber,
    status: "pending_payment",
    currency,
    subtotal_amount: subtotal,
    total_amount: subtotal,
    payment_provider: "razorpay",
  };

  const { data: order, error: orderError } = await supabaseAdmin
    .from("orders")
    .insert(orderPayload)
    .select("id, order_number")
    .single();

  if (orderError || !order) {
    return NextResponse.json(
      {
        error: "Unable to create the order record.",
      },
      { status: 500 }
    );
  }

  const { error: orderItemsError } = await supabaseAdmin.from("order_items").insert(
    validatedItems.map((item) => ({
      order_id: order.id,
      product_variant_id: null,
      product_name: item.productName,
      variant_title: item.slug,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      line_total: item.lineTotal,
    }))
  );

  if (orderItemsError) {
    await supabaseAdmin.from("orders").delete().eq("id", order.id);

    return NextResponse.json(
      {
        error: "Unable to save the cart items for this order.",
      },
      { status: 500 }
    );
  }

  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(subtotal * 100),
    currency,
    receipt: order.order_number,
    notes: {
      orderId: order.id,
      orderNumber: order.order_number,
      customerEmail: session.user?.email || "guest",
    },
  });

  await supabaseAdmin
    .from("orders")
    .update({
      payment_reference: razorpayOrder.id,
    })
    .eq("id", order.id);

  return NextResponse.json({
    key: razorpayConfig.keyId,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    name: "ApexStride Cart Checkout",
    description: `${validatedItems.length} cart line(s) ready for payment`,
    orderId: razorpayOrder.id,
    internalOrderId: order.id,
    orderNumber: order.order_number,
    customerEmail: session.user?.email || "",
    callbackUrl: `${razorpayConfig.siteUrl}/api/checkout/verify`,
  });
}
