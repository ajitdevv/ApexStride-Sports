"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { adminNavigation } from "@/lib/config/navigation";
import { AdminNav } from "@/components/admin/admin-nav";

export function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-controls="admin-mobile-nav"
        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white transition hover:bg-white/16"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {isOpen ? (
        <div
          id="admin-mobile-nav"
          className="mt-4 rounded-4xl border border-white/10 bg-[#081120]/96 p-4 shadow-[0_22px_55px_rgba(2,8,23,0.45)] backdrop-blur-2xl"
        >
          <AdminNav items={adminNavigation} onNavigate={() => setIsOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}
