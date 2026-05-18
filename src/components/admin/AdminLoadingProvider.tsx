"use client";

import {
  createContext,
  useCallback,
  useContext,
  useTransition,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AdminPageLoader } from "@/components/admin/AdminPageLoader";

type AdminLoadingContextValue = {
  navigate: (href: string) => void;
  isNavigating: boolean;
};

export const AdminLoadingContext =
  createContext<AdminLoadingContextValue | null>(null);

export function AdminLoadingProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();

  const navigate = useCallback(
    (href: string) => {
      startTransition(() => {
        router.push(href);
      });
    },
    [router],
  );

  return (
    <AdminLoadingContext.Provider value={{ navigate, isNavigating }}>
      {children}
    </AdminLoadingContext.Provider>
  );
}

export function useAdminNavigation() {
  const ctx = useContext(AdminLoadingContext);
  if (!ctx) {
    throw new Error("useAdminNavigation must be used within AdminLoadingProvider");
  }
  return ctx;
}

/** Vervangt inhoud door de loader tijdens client-side navigatie in het admin-paneel. */
export function AdminNavigationLoader({ children }: { children: ReactNode }) {
  const { isNavigating } = useAdminNavigation();
  if (isNavigating) return <AdminPageLoader />;
  return <>{children}</>;
}
