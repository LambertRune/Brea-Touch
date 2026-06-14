"use server";

import {
  createItem,
  deleteItem,
  getServerDirectus,
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
