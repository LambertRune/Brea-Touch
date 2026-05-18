import { Suspense } from "react";
import { AdminCmsAlert } from "@/components/admin/AdminCmsAlert";
import { AdminPageLoader } from "@/components/admin/AdminPageLoader";
import { loadAdminLegalPages } from "@/lib/admin-cms";
import { VoorwaardenManager } from "./VoorwaardenManager";

export const metadata = { title: "Voorwaarden beheer" };

async function VoorwaardenContent() {
  const { data: items, error } = await loadAdminLegalPages();
  return (
    <>
      {error && <AdminCmsAlert message={error} />}
      <VoorwaardenManager items={items} />
    </>
  );
}

export default function AdminVoorwaardenPage() {
  return (
    <>
      <h1>Voorwaarden</h1>
      <p className="admin-muted">
        Elke pagina krijgt een link in de footer onder Juridische informatie.
      </p>
      <Suspense fallback={<AdminPageLoader />}>
        <VoorwaardenContent />
      </Suspense>
    </>
  );
}
