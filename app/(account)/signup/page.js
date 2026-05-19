import { redirect } from "next/navigation";
import { BadgePill } from "@/components/shared/badge-pill";
import { SectionShell } from "@/components/shared/section-shell";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { Button } from "@/components/ui/button";
import { AuthForm } from "@/components/account/auth-form";
import { getSessionSnapshot } from "@/lib/supabase/auth";

export const metadata = {
  title: "Sign up",
};

export default async function SignupPage({ searchParams }) {
  const session = await getSessionSnapshot();
  const resolvedSearchParams = await searchParams;
  const nextPath = typeof resolvedSearchParams?.next === "string" && resolvedSearchParams.next.startsWith("/") ? resolvedSearchParams.next : "/account";

  if (session.user) {
    redirect(nextPath);
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <SectionShell className="py-12 sm:py-16">
          <div className="mx-auto max-w-xl rounded-4xl border surface-card bg-white/94 p-8 card-shadow sm:p-10">
            <BadgePill>New customer account</BadgePill>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">Create your ApexStride account</h1>
            <p className="mt-4 text-sm leading-8 text-contrast-muted sm:text-base">
              Join the storefront to save your profile, prepare for future order history, and build a smoother premium shopping journey.
            </p>
            <AuthForm mode="signup" redirectTo={nextPath} />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={nextPath === "/account" ? "/login" : `/login?next=${encodeURIComponent(nextPath)}`} variant="outline">
                Already have an account
              </Button>
              <Button href="/shop" variant="ghost">
                Browse products
              </Button>
            </div>
          </div>
        </SectionShell>
      </main>
      <SiteFooter />
    </div>
  );
}
