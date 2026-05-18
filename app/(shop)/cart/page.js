import { CartPageClient } from "@/components/cart/cart-page-client";
import { SectionShell } from "@/components/shared/section-shell";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export const metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <SectionShell className="py-12 sm:py-16">
          <CartPageClient />
        </SectionShell>
      </main>
      <SiteFooter />
    </div>
  );
}
