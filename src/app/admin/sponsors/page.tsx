import { Suspense } from "react";
import { AdminCmsAlert } from "@/components/admin/AdminCmsAlert";
import { AdminPageLoader } from "@/components/admin/AdminPageLoader";
import { loadAdminSponsors } from "@/lib/admin-cms";
import { SponsorsManager } from "./SponsorsManager";

export const metadata = { title: "Sponsors beheer" };

async function SponsorsContent() {
  const { data: items, error } = await loadAdminSponsors();
  return (
    <>
      {error && <AdminCmsAlert message={error} />}
      <SponsorsManager items={items} />
    </>
  );
}

export default function AdminSponsorsPage() {
  return (
    <>
      <h1>Sponsors</h1>
      <p className="admin-muted">Hexagon-grid op de sponsorovereenkomst-pagina.</p>
      <Suspense fallback={<AdminPageLoader />}>
        <SponsorsContent />
      </Suspense>
    </>
  );
}
