import { AdminPageLoader } from "@/components/admin/AdminPageLoader";

/** Toont de standaard admin-loader zolang `loading` true is. */
export function AdminLoadingGate({
  loading,
  label,
  children,
}: {
  loading: boolean;
  label?: string;
  children: React.ReactNode;
}) {
  if (loading) return <AdminPageLoader label={label} />;
  return <>{children}</>;
}
