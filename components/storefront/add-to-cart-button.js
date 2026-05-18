"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";

export function AddToCartButton({ product }) {
  const router = useRouter();
  const { addItem } = useCart();

  function handleAddToCart() {
    addItem(product);
    router.push("/cart");
  }

  return (
    <Button onClick={handleAddToCart} type="button">
      Add to cart
    </Button>
  );
}
