import { CheckoutPageClient } from "@/components/storefront/checkout-page-client";
import { SectionShell } from "@/components/shared/section-shell";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export const metadata = {
  title: "Checkout",
};

export default async function CheckoutPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const currentStatus = typeof resolvedSearchParams?.status === "string" ? resolvedSearchParams.status : "idle";
  const orderNumber = typeof resolvedSearchParams?.order === "string" ? resolvedSearchParams.order : "";

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <SectionShell className="py-12 sm:py-16">
          <CheckoutPageClient currentStatus={currentStatus} orderNumber={orderNumber} />
        </SectionShell>
      </main>
      <SiteFooter />
    </div>
  );
}
