"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  deleteLegalPageAction,
  reorderLegalPagesAction,
  saveLegalPageAction,
} from "@/app/actions/cms";
import { AdminLoadingGate } from "@/components/admin/AdminLoadingGate";
import { AdminSortableList } from "@/components/admin/AdminSortableList";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type { LegalPage } from "@/lib/directus";

export function VoorwaardenManager({ items }: { items: LegalPage[] }) {
  const router = useRouter();
  const [ordered, setOrdered] = useState(items);
  const [editing, setEditing] = useState<LegalPage | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setOrdered(items);
  }, [items]);

  function resetForm() {
    setEditing(null);
    setTitle("");
    setSlug("");
    setContent("");
    setError(null);
  }

  function startEdit(item: LegalPage) {
    setEditing(item);
    setTitle(item.title);
    setSlug(item.slug);
    setContent(item.content || "");
    setError(null);
  }

  function handleSave() {
    setError(null);
    startTransition(async () => {
      try {
        await saveLegalPageAction({
          id: editing?.id,
          title,
          slug,
          content,
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
    if (!confirm("Pagina verwijderen?")) return;
    startTransition(async () => {
      await deleteLegalPageAction(id);
      router.refresh();
    });
  }

  function handleReorder(next: LegalPage[]) {
    setOrdered(next);
    startTransition(async () => {
      await reorderLegalPagesAction(next.map((i) => i.id));
      router.refresh();
    });
  }

  return (
    <AdminLoadingGate loading={pending}>
    <div>
      <section className="admin-panel card">
        <h2>{editing ? "Bewerken" : "Nieuwe pagina"}</h2>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label" htmlFor="title">
              Titel (footer)
            </label>
            <input
              id="title"
              className="admin-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label" htmlFor="slug">
              URL-slug
            </label>
            <input
              id="slug"
              className="admin-input"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="privacyverklaring"
            />
          </div>
        </div>
        {slug && (
          <p className="admin-list-meta">
            Preview: /voorwaarden/{slug.toLowerCase().replace(/\s+/g, "-")}
          </p>
        )}
        <RichTextEditor value={content} onChange={setContent} />
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
            Versleep items om de volgorde in de footer te wijzigen.
          </p>
          <AdminSortableList
            items={ordered}
            onReorder={handleReorder}
            disabled={pending}
            renderItem={(item) => (
              <>
                <div>
                  <p className="admin-list-title">{item.title}</p>
                  <p className="admin-list-meta">/voorwaarden/{item.slug}</p>
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
