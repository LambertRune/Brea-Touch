import { AdminDashboardGrid } from "@/components/admin/AdminDashboardGrid";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p className="admin-muted">Beheer de inhoud van de website.</p>
      <AdminDashboardGrid />
    </div>
  );
}
