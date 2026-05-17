"use client";

import Image from "next/image";
import { useState } from "react";
import { AdminLoadingGate } from "@/components/admin/AdminLoadingGate";
import { getImageUrl } from "@/lib/directus-url";

export function ImagePicker({
  value,
  onChange,
  label = "Afbeelding",
}: {
  value: string | null;
  onChange: (fileId: string | null) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const preview = getImageUrl(value, "width=400&height=400&fit=cover");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/files", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload mislukt");
      onChange(data.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload mislukt");
    } finally {
      setUploading(false);
    }
  }

  return (
    <AdminLoadingGate loading={uploading} label="Uploaden…">
    <div className="admin-field">
      <span className="admin-label">{label}</span>
      {preview && (
        <div className="admin-image-preview">
          <Image src={preview} alt="" fill style={{ objectFit: "cover" }} unoptimized />
        </div>
      )}
      <div className="admin-actions">
        <label className="btn btn--outline btn--sm" style={{ cursor: "pointer" }}>
          Kies bestand
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            disabled={uploading}
            onChange={handleFile}
          />
        </label>
        {value && (
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() => onChange(null)}
          >
            Verwijderen
          </button>
        )}
      </div>
      {error && <p className="admin-error">{error}</p>}
    </div>
    </AdminLoadingGate>
  );
}
