"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { BarChart3, Boxes, ClipboardList, FolderKanban, LayoutDashboard, Package2, Tags, Users } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const iconMap = {
  Dashboard: LayoutDashboard,
  Orders: ClipboardList,
  Catalog: FolderKanban,
  Products: Package2,
  Categories: Tags,
  Customers: Users,
  Reports: BarChart3,
  Commerce: Boxes,
};

function isRouteActive(pathname, item) {
  if (item.exact) {
    return pathname === item.href;
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function AdminNav({ items, onNavigate }) {
  const pathname = usePathname();

  const sections = useMemo(
    () =>
      items.map((section) => ({
        ...section,
        hasActiveChild: section.items.some((item) => isRouteActive(pathname, item)),
      })),
    [items, pathname]
  );

  return (
    <nav className="grid gap-5" aria-label="Admin navigation">
      {sections.map((section) => {
        const SectionIcon = iconMap[section.label] ?? Boxes;

        return (
          <div key={section.label} className="rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
            <div
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition",
                section.hasActiveChild ? "bg-white/10 text-white" : "text-slate-300"
              )}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1b30] text-sky-200">
                <SectionIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Section</p>
                <p className="mt-1 text-sm font-semibold text-white">{section.label}</p>
              </div>
            </div>
            <div className="mt-3 grid gap-2">
              {section.items.map((item) => {
                const isActive = isRouteActive(pathname, item);
                const ItemIcon = iconMap[item.label] ?? SectionIcon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-linear-to-r from-sky-400 to-indigo-400 text-slate-950 shadow-[0_18px_35px_rgba(56,189,248,0.25)]"
                        : "text-slate-300 hover:bg-white/8 hover:text-white"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-2xl border transition",
                        isActive
                          ? "border-slate-950/10 bg-white/40 text-slate-950"
                          : "border-white/10 bg-[#0d1b30] text-sky-200 group-hover:border-sky-300/20"
                      )}
                    >
                      <ItemIcon className="h-4 w-4" />
                    </span>
                    <span className="flex-1">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
