"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AdminLoadingProvider,
  AdminNavigationLoader,
} from "@/components/admin/AdminLoadingProvider";
import { AdminNavLink } from "@/components/admin/AdminNavLink";
import { useEffect, useState } from "react";
import {
  FileText,
  Heart,
  Hexagon,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeft,
  X,
} from "lucide-react";
import { logoutAction } from "@/app/actions/auth";

const navItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Homepage", url: "/admin/homepage", icon: Home },
  { title: "Verhalen", url: "/admin/verhalen", icon: Heart },
  { title: "Voorwaarden", url: "/admin/voorwaarden", icon: FileText },
  { title: "Sponsors", url: "/admin/sponsors", icon: Hexagon },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <p className="admin-nav-label">Inhoud</p>
      {navItems.map((item) => {
        const active =
          item.url === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.url);
        const Icon = item.icon;
        return (
          <AdminNavLink
            key={item.url}
            href={item.url}
            onClick={onNavigate}
            className={`admin-nav-link${active ? " admin-nav-link--active" : ""}`}
          >
            <Icon size={18} strokeWidth={2} aria-hidden />
            {item.title}
          </AdminNavLink>
        );
      })}
    </>
  );
}

function SidebarPanel({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="admin-sidebar-brand">
        <AdminNavLink href="/admin" onClick={onNavigate}>
          <span>BréaTouch</span>
          <span>Beheer</span>
        </AdminNavLink>
      </div>
      <nav className="admin-nav">
        <NavLinks onNavigate={onNavigate} />
      </nav>
      <div className="admin-sidebar-foot">
        <Link href="/" className="btn btn--outline btn--sm" onClick={onNavigate}>
          <PanelLeft size={16} aria-hidden />
          Terug naar website
        </Link>
      </div>
    </>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <AdminLoadingProvider>
    <div className="admin-shell">
      <aside className="admin-sidebar" aria-label="Beheernavigatie">
        <SidebarPanel />
      </aside>

      {mobileOpen && (
        <>
          <button
            type="button"
            className="admin-overlay"
            aria-label="Menu sluiten"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="admin-sidebar admin-sidebar--mobile" aria-label="Menu">
            <SidebarPanel onNavigate={() => setMobileOpen(false)} />
          </aside>
        </>
      )}

      <button
        type="button"
        className="admin-mobile-fab"
        aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
        onClick={() => setMobileOpen((o) => !o)}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div className="admin-main-wrap">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-menu-toggle"
            aria-label="Menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>
          <span className="admin-topbar-title">Contentbeheer</span>
          <form action={logoutAction}>
            <button type="submit" className="btn btn--outline btn--sm">
              <LogOut size={16} aria-hidden />
              Uitloggen
            </button>
          </form>
        </header>
        <div className="admin-content">
          <div className="admin-content-inner">
            <AdminNavigationLoader>{children}</AdminNavigationLoader>
          </div>
        </div>
      </div>
    </div>
    </AdminLoadingProvider>
  );
}
