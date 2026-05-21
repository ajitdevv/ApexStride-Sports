import { redirect } from "next/navigation";
import { BadgePill } from "@/components/shared/badge-pill";
import { SectionShell } from "@/components/shared/section-shell";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { SignOutButton } from "@/components/account/sign-out-button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSessionSnapshot } from "@/lib/supabase/auth";

export const metadata = {
  title: "Account",
};

export default async function AccountPage() {
  const session = await getSessionSnapshot();

  if (!session.isConfigured) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main>
          <SectionShell className="py-8 sm:py-12">
            <div className="rounded-4xl border surface-card bg-white/94 p-5 card-shadow sm:p-7">
              <BadgePill className="eyebrow-spacing">Account preview</BadgePill>
              <h1 className="section-title mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Supabase credentials are still needed</h1>
              <p className="support-copy mt-3 max-w-3xl text-sm text-contrast-muted sm:text-base">
                Add your Supabase environment values to unlock sign-in, profile loading, and the protected customer journey.
              </p>
            </div>
          </SectionShell>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!session.user) {
    redirect("/login");
  }

  const client = await createSupabaseServerClient();
  const { data: profile } = client
    ? await client
        .from("profiles")
        .select("full_name, role, phone, is_active")
        .eq("id", session.user.id)
        .maybeSingle()
    : { data: null };

  const fullName = profile?.full_name || session.user.user_metadata?.full_name || "ApexStride customer";

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <SectionShell className="py-8 sm:py-12">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-4xl border surface-card bg-white/94 p-5 card-shadow sm:p-7">
              <BadgePill className="eyebrow-spacing">Account overview</BadgePill>
              <h1 className="section-title text-wrap-safe mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Welcome, {fullName}</h1>
              <p className="support-copy mt-3 max-w-3xl text-sm text-contrast-muted sm:text-base">
                Review your live account details, keep your profile up to date, and use this space as the base for orders and saved preferences.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="rounded-3xl border border-border/70 bg-background/88 p-4 sm:p-5">
                  <p className="text-sm font-semibold text-foreground">Email</p>
                  <p className="text-wrap-safe mt-2 text-sm text-contrast-muted">{session.user.email}</p>
                </div>
                <div className="rounded-3xl border border-border/70 bg-background/88 p-4 sm:p-5">
                  <p className="text-sm font-semibold text-foreground">Profile role</p>
                  <p className="mt-2 text-sm capitalize text-contrast-muted">{profile?.role ?? "customer"}</p>
                </div>
                <div className="rounded-3xl border border-border/70 bg-background/88 p-4 sm:p-5">
                  <p className="text-sm font-semibold text-foreground">Phone</p>
                  <p className="text-wrap-safe mt-2 text-sm text-contrast-muted">{profile?.phone || "Add later"}</p>
                </div>
                <div className="rounded-3xl border border-border/70 bg-background/88 p-4 sm:p-5">
                  <p className="text-sm font-semibold text-foreground">Account status</p>
                  <p className="mt-2 text-sm text-contrast-muted">{profile?.is_active === false ? "Inactive" : "Active"}</p>
                </div>
              </div>
              <div className="mt-5">
                <SignOutButton />
              </div>
            </div>
            <div className="rounded-4xl border surface-card bg-white/94 p-5 card-shadow sm:p-7">
              <BadgePill className="eyebrow-spacing">What comes next</BadgePill>
              <div className="mt-4 grid gap-3">
                <div className="rounded-3xl border border-border/70 bg-background/88 p-4 sm:p-5">
                  <p className="text-sm font-semibold text-foreground">Order history</p>
                  <p className="mt-2 text-sm leading-6 text-contrast-muted">Paid orders will appear here as they are created through the live checkout flow.</p>
                </div>
                <div className="rounded-3xl border border-border/70 bg-background/88 p-4 sm:p-5">
                  <p className="text-sm font-semibold text-foreground">Saved addresses</p>
                  <p className="mt-2 text-sm leading-6 text-contrast-muted">Saved addresses will be managed here once customer address entry is enabled in the app.</p>
                </div>
                <div className="rounded-3xl border border-border/70 bg-background/88 p-4 sm:p-5">
                  <p className="text-sm font-semibold text-foreground">Checkout status</p>
                  <p className="mt-2 text-sm leading-6 text-contrast-muted">Checkout status and payment updates will be reflected here as orders move through the live flow.</p>
                </div>
              </div>
            </div>
          </div>
        </SectionShell>
      </main>
      <SiteFooter />
    </div>
  );
}
