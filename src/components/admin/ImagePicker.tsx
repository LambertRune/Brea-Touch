"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminLoadingGate } from "@/components/admin/AdminLoadingGate";
import { getAdminAssetUrl } from "@/lib/admin-asset-url";
import { PhotoLightbox } from "@/components/PhotoLightbox";

type DirectusFile = {
  id: string;
  title?: string | null;
  type?: string | null;
  width?: number | null;
  height?: number | null;
};

type PreviewMode = "thumb" | "full";

export function ImagePicker({
  value,
  onChange,
  label = "Afbeelding",
  preview = "thumb",
  showLibrary = true,
}: {
  value: string | null;
  onChange: (fileId: string | null) => void;
  label?: string;
  preview?: PreviewMode;
  showLibrary?: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [loadingLibrary, setLoadingLibrary] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [libraryFiles, setLibraryFiles] = useState<DirectusFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const previewUrl = getAdminAssetUrl(
    value,
    preview === "thumb" ? "width=400&height=400&fit=inside" : undefined,
  );
  const fullPreviewUrl = value ? getAdminAssetUrl(value) : null;

  const loadLibrary = useCallback(async () => {
    setLoadingLibrary(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/files?limit=100");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Bibliotheek laden mislukt");
      const list = Array.isArray(data) ? data : data.data ?? [];
      setLibraryFiles(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bibliotheek laden mislukt");
      setLibraryFiles([]);
    } finally {
      setLoadingLibrary(false);
    }
  }, []);

  useEffect(() => {
    if (libraryOpen) loadLibrary();
  }, [libraryOpen, loadLibrary]);

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
      setLibraryOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload mislukt");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function selectFromLibrary(fileId: string) {
    onChange(fileId);
    setLibraryOpen(false);
  }

  const previewClass =
    preview === "full"
      ? "admin-image-preview admin-image-preview--full"
      : "admin-image-preview";

  return (
    <AdminLoadingGate loading={uploading} label="Uploaden…">
      <div className="admin-field">
        <span className="admin-label">{label}</span>

        {previewUrl && fullPreviewUrl ? (
          <div className={previewClass}>
            <PhotoLightbox
              src={previewUrl}
              fullSrc={fullPreviewUrl}
              alt={label}
              imageClassName={preview === "full" ? "admin-image-preview__img--full" : undefined}
            />
          </div>
        ) : (
          <p className="admin-muted admin-image-empty">Nog geen afbeelding gekozen.</p>
        )}

        <div className="admin-actions">
          <label className="btn btn--outline btn--sm" style={{ cursor: "pointer" }}>
            Nieuwe upload
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              disabled={uploading}
              onChange={handleFile}
            />
          </label>
          {showLibrary && (
            <button
              type="button"
              className="btn btn--outline btn--sm"
              onClick={() => setLibraryOpen(true)}
              disabled={uploading}
            >
              Kies uit bibliotheek
            </button>
          )}
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

        {libraryOpen && (
          <div
            className="admin-media-library"
            role="dialog"
            aria-modal="true"
            aria-label="Afbeeldingenbibliotheek"
            onClick={() => setLibraryOpen(false)}
          >
            <div
              className="admin-media-library__panel card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin-media-library__header">
                <h3>Kies een afbeelding</h3>
                <button
                  type="button"
                  className="btn btn--outline btn--sm"
                  onClick={() => setLibraryOpen(false)}
                >
                  Sluiten
                </button>
              </div>

              {loadingLibrary ? (
                <p className="admin-muted">Laden…</p>
              ) : libraryFiles.length === 0 ? (
                <p className="admin-muted">
                  Geen afbeeldingen gevonden. Upload eerst een bestand.
                </p>
              ) : (
                <div className="admin-media-library__grid">
                  {libraryFiles.map((file) => {
                    const thumb = getAdminAssetUrl(
                      file.id,
                      "width=200&height=200&fit=cover",
                    );
                    const selected = value === file.id;
                    return (
                      <button
                        key={file.id}
                        type="button"
                        className={`admin-media-library__item${selected ? " admin-media-library__item--selected" : ""}`}
                        onClick={() => selectFromLibrary(file.id)}
                        title={file.title || file.id}
                      >
                        {thumb && (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={thumb} alt="" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLoadingGate>
  );
}
