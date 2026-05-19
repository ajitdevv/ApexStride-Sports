import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { adminNavigation } from "@/lib/config/navigation";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";
import { AdminNav } from "@/components/admin/admin-nav";
import { BadgePill } from "@/components/shared/badge-pill";
import { LogoMark } from "@/components/shared/logo-mark";
import { SectionShell } from "@/components/shared/section-shell";

export function AdminShell({ accessMessage, children }) {
  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <SectionShell className="py-6 sm:py-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr] xl:gap-8">
          <aside className="rounded-4xl border border-white/10 bg-linear-to-b from-[#0b1528] via-[#081120] to-[#07101d] p-5 surface-shadow backdrop-blur-xl sm:p-6 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:overflow-y-auto">
            <div className="hero-glow relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-white/12 via-white/6 to-transparent p-5">
              <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-sky-400/12 via-transparent to-transparent" />
              <div className="relative">
                <LogoMark className="[&_span:last-child>span:first-child]:text-sky-200 [&_span:last-child>span:last-child]:text-slate-300" />
                <BadgePill className="mt-5 border-white/10 bg-white/10 text-sky-200">Premium admin workspace</BadgePill>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">Operate the storefront with clarity.</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Move between orders, catalog visibility, customers, and reporting from one premium control center.
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4 lg:hidden">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Navigation</p>
                <p className="mt-1 text-sm font-semibold text-white">Open admin sections</p>
              </div>
              <AdminMobileNav />
            </div>

            <div className="mt-5 hidden lg:block">
              <AdminNav items={adminNavigation} />
            </div>

            <div className="mt-5 rounded-3xl border border-white/10 bg-[#0d1b30] p-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sky-200">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold text-white">Access state</p>
                  <p className="mt-2 leading-7">{accessMessage}</p>
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to storefront
            </Link>
          </aside>
          <main className="min-w-0">{children}</main>
        </div>
      </SectionShell>
    </div>
  );
}
