"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  deleteTestimonialAction,
  reorderTestimonialsAction,
  saveTestimonialAction,
} from "@/app/actions/cms";
import { AdminLoadingGate } from "@/components/admin/AdminLoadingGate";
import { AdminSortableList } from "@/components/admin/AdminSortableList";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type { Testimonial } from "@/lib/directus";

export function VerhalenManager({ items }: { items: Testimonial[] }) {
  const router = useRouter();
  const [ordered, setOrdered] = useState(items);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [quote, setQuote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setOrdered(items);
  }, [items]);

  function resetForm() {
    setEditing(null);
    setQuote("");
    setError(null);
  }

  function startEdit(item: Testimonial) {
    setEditing(item);
    setQuote(item.quote);
    setError(null);
  }

  function handleSave() {
    setError(null);
    startTransition(async () => {
      const result = await saveTestimonialAction({
        id: editing?.id,
        quote,
        sort: editing ? undefined : ordered.length,
      });
      if (result?.error) {
        setError(result.error);
        return;
      }
      router.refresh();
      resetForm();
    });
  }

  function handleDelete(id: number) {
    if (!confirm("Verhaal verwijderen?")) return;
    startTransition(async () => {
      await deleteTestimonialAction(id);
      router.refresh();
    });
  }

  function handleReorder(next: Testimonial[]) {
    setOrdered(next);
    startTransition(async () => {
      await reorderTestimonialsAction(next.map((i) => i.id));
      router.refresh();
    });
  }

  return (
    <AdminLoadingGate loading={pending}>
    <div>
      <section className="admin-panel card">
        <h2>{editing ? "Bewerken" : "Nieuw verhaal"}</h2>
        <p className="admin-list-meta">Op de homepage: {ordered.length} / 3</p>
        <RichTextEditor value={quote} onChange={setQuote} placeholder="Citaat…" />
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
            Versleep items om de volgorde op de homepage te wijzigen.
          </p>
          <AdminSortableList
            items={ordered}
            onReorder={handleReorder}
            disabled={pending}
            renderItem={(item) => (
              <>
                <div>
                  <div dangerouslySetInnerHTML={{ __html: item.quote }} />
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
