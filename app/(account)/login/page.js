import { redirect } from "next/navigation";
import { BadgePill } from "@/components/shared/badge-pill";
import { SectionShell } from "@/components/shared/section-shell";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { Button } from "@/components/ui/button";
import { AuthForm } from "@/components/account/auth-form";
import { getSessionSnapshot } from "@/lib/supabase/auth";

export const metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const session = await getSessionSnapshot();

  if (session.user) {
    redirect("/account");
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <SectionShell className="py-12 sm:py-16">
          <div className="mx-auto max-w-xl rounded-4xl border border-white/60 bg-white/90 p-8 card-shadow sm:p-10">
            <BadgePill>Customer access</BadgePill>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">Welcome back</h1>
            <p className="mt-4 text-sm leading-8 text-muted-foreground sm:text-base">
              Sign in to manage your account, review your profile, and continue your ApexStride Sports journey.
            </p>
            <AuthForm mode="login" />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/signup" variant="outline">
                Create account
              </Button>
              <Button href="/shop" variant="ghost">
                Continue shopping
              </Button>
            </div>
          </div>
        </SectionShell>
      </main>
      <SiteFooter />
    </div>
  );
}
