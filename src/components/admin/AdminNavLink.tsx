"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, type ComponentProps } from "react";
import { AdminLoadingContext } from "@/components/admin/AdminLoadingProvider";

type AdminNavLinkProps = ComponentProps<typeof Link> & {
  href: string;
};

/**
 * Client-navigatie met loading-state in sidebar (binnen AdminLoadingProvider).
 * Buiten de provider (bv. dashboard-children van een server page) valt terug op <Link>.
 */
export function AdminNavLink({
  href,
  onClick,
  children,
  ...props
}: AdminNavLinkProps) {
  const pathname = usePathname();
  const ctx = useContext(AdminLoadingContext);

  if (!ctx) {
    return (
      <Link href={href} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  }

  const { navigate } = ctx;

  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (href === pathname) return;
        e.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </Link>
  );
}
