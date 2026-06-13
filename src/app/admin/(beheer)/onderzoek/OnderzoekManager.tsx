"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  deleteOnderzoekItemAction,
  reorderOnderzoekItemsAction,
  saveOnderzoekItemAction,
} from "@/app/actions/cms";
import { AdminLoadingGate } from "@/components/admin/AdminLoadingGate";
import { AdminSortableList } from "@/components/admin/AdminSortableList";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImagePicker } from "@/components/admin/ImagePicker";
import { slugFromTitle } from "@/lib/slug";
import type { OnderzoekItem, OnderzoekKind, OnderzoekLanguage } from "@/lib/directus";

const KIND_LABEL: Record<OnderzoekKind, string> = {
  brochure: "Brochure",
  article: "Artikel",
};

export function OnderzoekManager({ items }: { items: OnderzoekItem[] }) {
  const router = useRouter();
  const [ordered, setOrdered] = useState(items);
  const [editing, setEditing] = useState<OnderzoekItem | null>(null);
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState<OnderzoekKind>("brochure");
  const [language, setLanguage] = useState<OnderzoekLanguage>("nl");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [brochureFile, setBrochureFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setOrdered(items);
  }, [items]);

  function resetForm() {
    setEditing(null);
    setTitle("");
    setKind("brochure");
    setLanguage("nl");
    setExcerpt("");
    setBody("");
    setBrochureFile(null);
    setError(null);
  }

  function fileIdFromField(
    field: string | { id: string } | null | undefined,
  ): string | null {
    if (!field) return null;
    if (typeof field === "string") return field;
    if (typeof field === "object" && "id" in field) return String(field.id);
    return null;
  }

  function startEdit(item: OnderzoekItem) {
    setEditing(item);
    setTitle(item.title);
    setKind(item.kind);
    setLanguage(item.language);
    setExcerpt(item.excerpt || "");
    setBody(item.body || "");
    setBrochureFile(fileIdFromField(item.brochure_file as string | { id: string } | null));
    setError(null);
  }

  function handleSave() {
    setError(null);
    startTransition(async () => {
      const result = await saveOnderzoekItemAction({
        id: editing?.id,
        title,
        kind,
        excerpt,
        body,
        brochure_file: brochureFile,
        language,
        sort: editing ? undefined : ordered.length,
      });
      if ("error" in result && result.error) {
        setError(result.error);
        return;
      }
      router.refresh();
      resetForm();
    });
  }

  function handleDelete(id: number) {
    if (!confirm("Item verwijderen?")) return;
    startTransition(async () => {
      await deleteOnderzoekItemAction(id);
      router.refresh();
    });
  }

  function handleReorder(next: OnderzoekItem[]) {
    setOrdered(next);
    startTransition(async () => {
      await reorderOnderzoekItemsAction(next.map((i) => i.id));
      router.refresh();
    });
  }

  const previewSlug = slugFromTitle(title);

  return (
    <AdminLoadingGate loading={pending}>
      <div>
        <section className="admin-panel card">
          <h2>{editing ? "Bewerken" : "Nieuw item"}</h2>
          <div className="admin-field">
            <label className="admin-label" htmlFor="onderzoek-title">
              Titel
            </label>
            <input
              id="onderzoek-title"
              className="admin-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {previewSlug && (
            <p className="admin-list-meta">
              URL: /onderzoek/{previewSlug}
            </p>
          )}
          <div className="admin-grid-2">
            <div className="admin-field">
              <label className="admin-label" htmlFor="onderzoek-kind">
                Type
              </label>
              <select
                id="onderzoek-kind"
                className="admin-input"
                value={kind}
                onChange={(e) => setKind(e.target.value as OnderzoekKind)}
              >
                <option value="brochure">Brochure (foto)</option>
                <option value="article">Artikel</option>
              </select>
            </div>
            <div className="admin-field">
              <label className="admin-label" htmlFor="onderzoek-language">
                Taal
              </label>
              <select
                id="onderzoek-language"
                className="admin-input"
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value as OnderzoekLanguage)
                }
              >
                <option value="nl">Nederlands</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
          <div className="admin-field">
            <label className="admin-label" htmlFor="onderzoek-excerpt">
              Korte intro (optioneel)
            </label>
            <textarea
              id="onderzoek-excerpt"
              className="admin-input"
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>
          {kind === "brochure" ? (
            <ImagePicker
              label="Brochurefoto"
              value={brochureFile}
              onChange={setBrochureFile}
              preview="full"
            />
          ) : (
            <RichTextEditor value={body} onChange={setBody} />
          )}
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
            <p
              className="admin-list-meta"
              style={{ marginBottom: "var(--space-sm)" }}
            >
              Versleep items om de volgorde op /onderzoek te wijzigen.
            </p>
            <AdminSortableList
              items={ordered}
              onReorder={handleReorder}
              disabled={pending}
              renderItem={(item) => (
                <>
                  <div>
                    <p className="admin-list-title">{item.title}</p>
                    <p className="admin-list-meta">
                      /onderzoek/{item.slug} · {KIND_LABEL[item.kind]}
                      {item.language === "en" ? " · EN" : ""}
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
