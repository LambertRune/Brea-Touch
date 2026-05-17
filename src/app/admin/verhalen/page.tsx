import { Suspense } from "react";
import { AdminCmsAlert } from "@/components/admin/AdminCmsAlert";
import { AdminPageLoader } from "@/components/admin/AdminPageLoader";
import { loadAdminTestimonials } from "@/lib/admin-cms";
import { VerhalenManager } from "./VerhalenManager";

export const metadata = { title: "Verhalen beheer" };

async function VerhalenContent() {
  const { data: items, error } = await loadAdminTestimonials();
  return (
    <>
      {error && <AdminCmsAlert message={error} />}
      <VerhalenManager items={items} />
    </>
  );
}

export default function AdminVerhalenPage() {
  return (
    <div>
      <h1>Persoonlijke verhalen</h1>
      <p className="admin-muted">Maximaal 3 verhalen op de homepage. Opslaan = direct zichtbaar.</p>
      <Suspense fallback={<AdminPageLoader />}>
        <VerhalenContent />
      </Suspense>
    </div>
  );
}
