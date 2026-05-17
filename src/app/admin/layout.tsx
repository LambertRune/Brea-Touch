import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminUser } from "@/lib/auth";
import "./admin.css";

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  if (pathname === "/admin/login") {
    return <div data-admin-login>{children}</div>;
  }

  const user = await getAdminUser();
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div data-admin>
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
