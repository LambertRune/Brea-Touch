"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BookOpen,
  FileText,
  Heart,
  Hexagon,
  Home,
  LayoutDashboard,
  PanelLeft,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Homepage", url: "/admin/homepage", icon: Home },
  { title: "Verhalen", url: "/admin/verhalen", icon: Heart },
  { title: "Onderzoek", url: "/admin/onderzoek", icon: BookOpen },
  { title: "Voorwaarden", url: "/admin/voorwaarden", icon: FileText },
  { title: "Sponsors", url: "/admin/sponsors", icon: Hexagon },
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const nav = (
    <nav className="flex flex-col gap-1">
      {adminItems.map((item) => {
        const active =
          item.url === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.url);
        return (
          <Link
            key={item.url}
            href={item.url}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg lg:hidden"
        aria-label="Menu"
      >
        {open ? <X className="h-6 w-6" /> : <PanelLeft className="h-6 w-6" />}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white p-6 pt-8 transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          BréaTouch
        </p>
        <h2 className="mb-8 text-xl font-bold text-slate-900">Beheer</h2>
        {nav}
      </aside>
    </>
  );
}
