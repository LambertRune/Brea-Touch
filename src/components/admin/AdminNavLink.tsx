"use client";

import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { useAdminNavigation } from "@/components/admin/AdminLoadingProvider";

type AdminNavLinkProps = ComponentProps<"a"> & {
  href: string;
};

export function AdminNavLink({
  href,
  onClick,
  children,
  ...props
}: AdminNavLinkProps) {
  const pathname = usePathname();
  const { navigate } = useAdminNavigation();

  return (
    <a
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
    </a>
  );
}
