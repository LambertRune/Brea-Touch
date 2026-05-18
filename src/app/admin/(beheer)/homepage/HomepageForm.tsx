"use client";

import { useState, useTransition } from "react";
import { saveSiteSettingsAction } from "@/app/actions/cms";
import { AdminLoadingGate } from "@/components/admin/AdminLoadingGate";
import { ImagePicker } from "@/components/admin/ImagePicker";

export function HomepageForm({
  settings,
}: {
  settings: { about_image: string | null; about_body: string | null } | null;
}) {
  const [aboutImage, setAboutImage] = useState<string | null>(
    settings?.about_image ?? null,
  );
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSave() {
    setMessage(null);
    setError(null);
    startTransition(async () => {
      try {
        await saveSiteSettingsAction({
          about_image: aboutImage,
          about_body: settings?.about_body ?? null,
        });
        setMessage("Opgeslagen.");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Opslaan mislukt");
      }
    });
  }

  return (
    <AdminLoadingGate loading={pending} label="Opslaan…">
    <div>
      <section className="admin-panel card">
        <h2>Wie wij zijn — foto</h2>
        <ImagePicker
          label="Foto (rechts op homepage)"
          value={aboutImage}
          onChange={setAboutImage}
        />
      </section>
      {message && <p className="admin-muted">{message}</p>}
      {error && <p className="admin-error">{error}</p>}
      <button type="button" className="btn btn--primary" onClick={handleSave} disabled={pending}>
        Opslaan
      </button>
    </div>
    </AdminLoadingGate>
  );
}
