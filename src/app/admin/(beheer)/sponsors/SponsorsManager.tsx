"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  deleteSponsorAction,
  reorderSponsorsAction,
  saveSponsorAction,
} from "@/app/actions/cms";
import { AdminLoadingGate } from "@/components/admin/AdminLoadingGate";
import { AdminSortableList } from "@/components/admin/AdminSortableList";
import { ImagePicker } from "@/components/admin/ImagePicker";
import type { Sponsor } from "@/lib/directus";

export function SponsorsManager({ items }: { items: Sponsor[] }) {
  const router = useRouter();
  const [ordered, setOrdered] = useState(items);
  const [editing, setEditing] = useState<Sponsor | null>(null);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [hexSize, setHexSize] = useState<"small" | "large">("small");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setOrdered(items);
  }, [items]);

  function resetForm() {
    setEditing(null);
    setName("");
    setPhoto(null);
    setWebsiteUrl("");
    setHexSize("small");
    setError(null);
  }

  function startEdit(item: Sponsor) {
    setEditing(item);
    setName(item.name);
    setPhoto(item.photo);
    setWebsiteUrl(item.website_url || "");
    setHexSize(item.hex_size);
    setError(null);
  }

  function handleSave() {
    if (!photo) {
      setError("Foto is verplicht.");
      return;
    }
    setError(null);
    startTransition(async () => {
      try {
        await saveSponsorAction({
          id: editing?.id,
          name,
          photo,
          website_url: websiteUrl || null,
          hex_size: hexSize,
          sort: editing ? undefined : ordered.length,
        });
        router.refresh();
        resetForm();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Opslaan mislukt");
      }
    });
  }

  function handleDelete(id: number) {
    if (!confirm("Sponsor verwijderen?")) return;
    startTransition(async () => {
      await deleteSponsorAction(id);
      router.refresh();
    });
  }

  function handleReorder(next: Sponsor[]) {
    setOrdered(next);
    startTransition(async () => {
      await reorderSponsorsAction(next.map((i) => i.id));
      router.refresh();
    });
  }

  return (
    <AdminLoadingGate loading={pending}>
    <div>
      <section className="admin-panel card">
        <h2>{editing ? "Bewerken" : "Nieuwe sponsor"}</h2>
        <div className="admin-field">
          <label className="admin-label" htmlFor="name">
            Naam
          </label>
          <input
            id="name"
            className="admin-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <ImagePicker label="Logo / foto" value={photo} onChange={setPhoto} />
        <div className="admin-field">
          <label className="admin-label" htmlFor="url">
            Website (optioneel)
          </label>
          <input
            id="url"
            type="url"
            className="admin-input"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://"
          />
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="hex-size">
            Hex-grootte
          </label>
          <select
            id="hex-size"
            className="admin-select"
            value={hexSize}
            onChange={(e) => setHexSize(e.target.value as "small" | "large")}
          >
            <option value="small">Klein</option>
            <option value="large">Groot</option>
          </select>
        </div>
        {error && <p className="admin-error">{error}</p>}
        <div className="admin-actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={handleSave}
            disabled={pending}
          >
            Opslaan
          </button>
          {editing && (
            <button
              type="button"
              className="btn btn--outline"
              onClick={resetForm}
            >
              Annuleren
            </button>
          )}
        </div>
      </section>

      {ordered.length > 0 && (
        <>
          <p className="admin-list-meta" style={{ marginBottom: "var(--space-sm)" }}>
            Versleep items om de volgorde op de site te wijzigen.
          </p>
          <AdminSortableList
            items={ordered}
            onReorder={handleReorder}
            disabled={pending}
            renderItem={(item) => (
              <>
                <div>
                  <p className="admin-list-title">{item.name}</p>
                  <p className="admin-list-meta">
                    {item.hex_size}
                    {item.website_url ? ` · ${item.website_url}` : ""}
                  </p>
                </div>
                <div className="admin-actions" style={{ marginTop: 0 }}>
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={() => startEdit(item)}
                  >
                    Bewerken
                  </button>
                  <button
                    type="button"
                    className="btn btn--danger btn--sm"
                    onClick={() => handleDelete(item.id)}
                    disabled={pending}
                  >
                    Verwijderen
                  </button>
                </div>
              </>
            )}
          />
        </>
      )}
    </div>
    </AdminLoadingGate>
  );
}
