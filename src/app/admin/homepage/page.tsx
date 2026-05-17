import { Suspense } from "react";
import { AdminCmsAlert } from "@/components/admin/AdminCmsAlert";
import { AdminPageLoader } from "@/components/admin/AdminPageLoader";
import { loadAdminSiteSettings } from "@/lib/admin-cms";
import { HomepageForm } from "./HomepageForm";

export const metadata = { title: "Homepage beheer" };

async function HomepageContent() {
  const { data: settings, error } = await loadAdminSiteSettings();
  return (
    <>
      {error && <AdminCmsAlert message={error} />}
      <HomepageForm settings={settings} />
    </>
  );
}

export default function AdminHomepagePage() {
  return (
    <div>
      <h1>Homepage</h1>
      <p className="admin-muted">
        Alleen de foto rechts bij &quot;Wie wij zijn&quot;. Tekst staat vast op de site.
      </p>
      <Suspense fallback={<AdminPageLoader />}>
        <HomepageContent />
      </Suspense>
    </div>
  );
}
