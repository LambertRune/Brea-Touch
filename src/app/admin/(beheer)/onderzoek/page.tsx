import { Suspense } from "react";
import { AdminCmsAlert } from "@/components/admin/AdminCmsAlert";
import { AdminPageLoader } from "@/components/admin/AdminPageLoader";
import { loadAdminOnderzoekItems } from "@/lib/admin-cms";
import { OnderzoekManager } from "./OnderzoekManager";

export const metadata = { title: "Onderzoek beheer" };

async function OnderzoekContent() {
  const { data: items, error } = await loadAdminOnderzoekItems();
  return (
    <>
      {error && <AdminCmsAlert message={error} />}
      <OnderzoekManager items={items} />
    </>
  );
}

export default function AdminOnderzoekPage() {
  return (
    <>
      <h1>Onderzoek</h1>
      <p className="admin-muted">
        Brochures (foto) en artikelen voor de publieke onderzoek-sectie.
      </p>
      <Suspense fallback={<AdminPageLoader />}>
        <OnderzoekContent />
      </Suspense>
    </>
  );
}
