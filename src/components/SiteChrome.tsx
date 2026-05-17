"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export function SiteChrome({
  children,
  header,
  footer,
}: {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    document.body.classList.toggle("site-shell", !isAdmin);
    return () => {
      document.body.classList.remove("site-shell");
    };
  }, [isAdmin]);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      <main className="site-main" style={{ paddingTop: "72px" }}>
        {children}
      </main>
      {footer}
    </>
  );
}
