"use server";

import { slugFromTitle } from "@/lib/slug";
import {
  createItem,
  deleteItem,
  getServerDirectus,
  readItem,
  readItems,
  updateItem,
  updateSingleton,
} from "@/lib/directus";
import { getAdminUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const LIVE_STATUS = "published" as const;

async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function saveSiteSettingsAction(data: {
  about_image: string | null;
  about_body: string | null;
}) {
  await requireAdmin();
  const directus = getServerDirectus();
  await directus.request(
    updateSingleton("site_settings", {
      about_image: data.about_image,
      about_body: data.about_body,
    }),
  );
  revalidatePath("/");
  return { success: true };
}

export async function reorderTestimonialsAction(orderedIds: number[]) {
  await requireAdmin();
  const directus = getServerDirectus();
  await Promise.all(
    orderedIds.map((id, index) =>
      directus.request(updateItem("testimonials", id, { sort: index })),
    ),
  );
  revalidatePath("/");
  revalidatePath("/admin/verhalen");
  return { success: true };
}

export async function saveTestimonialAction(data: {
  id?: number;
  quote: string;
  sort?: number;
}) {
  await requireAdmin();
  const directus = getServerDirectus();

  if (!data.id) {
    const existing = await directus.request(
      readItems("testimonials", { fields: ["id"], limit: 4 }),
    );
    if (existing.length >= 3) {
      return { error: "Maximaal 3 verhalen op de homepage." };
    }
  }

  if (data.id) {
    await directus.request(
      updateItem("testimonials", data.id, {
        quote: data.quote,
        status: LIVE_STATUS,
      }),
    );
  } else {
    await directus.request(
      createItem("testimonials", {
        quote: data.quote,
        sort: data.sort ?? 0,
        status: LIVE_STATUS,
      }),
    );
  }

  revalidatePath("/");
  revalidatePath("/admin/verhalen");
  return { success: true };
}

export async function deleteTestimonialAction(id: number) {
  await requireAdmin();
  const directus = getServerDirectus();
  await directus.request(deleteItem("testimonials", id));
  revalidatePath("/");
  revalidatePath("/admin/verhalen");
  return { success: true };
}

export async function reorderLegalPagesAction(orderedIds: number[]) {
  await requireAdmin();
  const directus = getServerDirectus();
  await Promise.all(
    orderedIds.map((id, index) =>
      directus.request(updateItem("legal_pages", id, { sort: index })),
    ),
  );
  revalidatePath("/");
  revalidatePath("/admin/voorwaarden");
  return { success: true };
}

export async function saveLegalPageAction(data: {
  id?: number;
  title: string;
  slug: string;
  content: string;
  sort?: number;
}) {
  await requireAdmin();
  const directus = getServerDirectus();
  const slug = data.slug
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  if (data.id) {
    await directus.request(
      updateItem("legal_pages", data.id, {
        title: data.title,
        slug,
        content: data.content,
        status: LIVE_STATUS,
      }),
    );
  } else {
    await directus.request(
      createItem("legal_pages", {
        title: data.title,
        slug,
        content: data.content,
        sort: data.sort ?? 0,
        status: LIVE_STATUS,
      }),
    );
  }

  revalidatePath("/");
  revalidatePath(`/voorwaarden/${slug}`);
  revalidatePath("/admin/voorwaarden");
  return { success: true };
}

export async function deleteLegalPageAction(id: number) {
  await requireAdmin();
  const directus = getServerDirectus();
  await directus.request(deleteItem("legal_pages", id));
  revalidatePath("/");
  revalidatePath("/admin/voorwaarden");
  return { success: true };
}

export async function reorderSponsorsAction(orderedIds: number[]) {
  await requireAdmin();
  const directus = getServerDirectus();
  await Promise.all(
    orderedIds.map((id, index) =>
      directus.request(updateItem("sponsors", id, { sort: index })),
    ),
  );
  revalidatePath("/doe-mee");
  revalidatePath("/admin/sponsors");
  return { success: true };
}

export async function saveSponsorAction(data: {
  id?: number;
  name: string;
  photo: string;
  website_url: string | null;
  hex_size: "small" | "large";
  sort?: number;
}) {
  await requireAdmin();
  const directus = getServerDirectus();
  if (data.id) {
    await directus.request(
      updateItem("sponsors", data.id, {
        name: data.name,
        photo: data.photo,
        website_url: data.website_url || null,
        hex_size: data.hex_size,
        status: LIVE_STATUS,
      }),
    );
  } else {
    await directus.request(
      createItem("sponsors", {
        name: data.name,
        photo: data.photo,
        website_url: data.website_url || null,
        hex_size: data.hex_size,
        sort: data.sort ?? 0,
        status: LIVE_STATUS,
      }),
    );
  }

  revalidatePath("/doe-mee");
  revalidatePath("/admin/sponsors");
  return { success: true };
}

export async function deleteSponsorAction(id: number) {
  await requireAdmin();
  const directus = getServerDirectus();
  await directus.request(deleteItem("sponsors", id));
  revalidatePath("/doe-mee");
  revalidatePath("/admin/sponsors");
  return { success: true };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export async function reorderOnderzoekItemsAction(orderedIds: number[]) {
  await requireAdmin();
  const directus = getServerDirectus();
  await Promise.all(
    orderedIds.map((id, index) =>
      directus.request(updateItem("onderzoek_items", id, { sort: index })),
    ),
  );
  revalidatePath("/onderzoek");
  revalidatePath("/admin/onderzoek");
  return { success: true };
}

export async function saveOnderzoekItemAction(data: {
  id?: number;
  title: string;
  kind: "brochure" | "article";
  excerpt?: string;
  body?: string;
  brochure_file?: string | null;
  language: "nl" | "en";
  sort?: number;
}) {
  await requireAdmin();
  const title = data.title.trim();
  const slug = slugFromTitle(title);
  if (!slug) {
    return { error: "Titel moet minstens één letter of cijfer bevatten." };
  }
  const excerpt = data.excerpt?.trim() || null;
  const body = data.body?.trim() || null;
  const brochure_file = data.brochure_file || null;

  if (data.kind === "brochure" && !brochure_file) {
    return { error: "Brochure vereist een foto." };
  }
  if (data.kind === "article" && !stripHtml(body || "")) {
    return { error: "Artikel vereist inhoud." };
  }

  const directus = getServerDirectus();
  let previousSlug: string | null = null;
  if (data.id) {
    try {
      const existing = await directus.request(
        readItem("onderzoek_items", data.id, { fields: ["slug"] }),
      );
      previousSlug =
        existing && typeof existing === "object" && "slug" in existing
          ? String(existing.slug)
          : null;
    } catch {
      /* ignore */
    }
  }

  const payload = {
    title,
    slug,
    kind: data.kind,
    excerpt,
    body: data.kind === "article" ? body : null,
    brochure_file: data.kind === "brochure" ? brochure_file : null,
    language: data.language,
    status: LIVE_STATUS,
  };

  if (data.id) {
    await directus.request(updateItem("onderzoek_items", data.id, payload));
  } else {
    await directus.request(
      createItem("onderzoek_items", {
        ...payload,
        sort: data.sort ?? 0,
      }),
    );
  }

  revalidatePath("/onderzoek");
  revalidatePath(`/onderzoek/${slug}`);
  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`/onderzoek/${previousSlug}`);
  }
  revalidatePath("/admin/onderzoek");
  return { success: true };
}

export async function deleteOnderzoekItemAction(id: number) {
  await requireAdmin();
  const directus = getServerDirectus();
  await directus.request(deleteItem("onderzoek_items", id));
  revalidatePath("/onderzoek");
  revalidatePath("/admin/onderzoek");
  return { success: true };
}
