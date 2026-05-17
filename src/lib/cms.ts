import {
  getServerDirectus,
  readItems,
  readSingleton,
  type LegalPage,
  type SiteSettings,
  type Sponsor,
  type Testimonial,
} from "@/lib/directus";

export { getImageUrl } from "@/lib/directus-url";

/** ISR for all CMS-driven server components (layout footer, pages). */
export const CMS_REVALIDATE_SECONDS = 60;

const publishedOnly = { status: { _eq: "published" as const } };

function asList<T>(value: unknown): T[] {
  return Array.isArray(value) ? value : [];
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const directus = getServerDirectus();
    return await directus.request(readSingleton("site_settings"));
  } catch (e) {
    console.error("[CMS] site_settings:", e);
    return null;
  }
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  try {
    const directus = getServerDirectus();
    const items = await directus.request(
      readItems("testimonials", {
        filter: publishedOnly,
        sort: ["sort", "id"],
        limit: 3,
      }),
    );
    return asList<Testimonial>(items);
  } catch (e) {
    console.error("[CMS] testimonials:", e);
    return [];
  }
}

export async function getPublishedLegalPages(): Promise<LegalPage[]> {
  try {
    const directus = getServerDirectus();
    const items = await directus.request(
      readItems("legal_pages", {
        filter: publishedOnly,
        sort: ["sort", "id"],
      }),
    );
    return asList<LegalPage>(items);
  } catch (e) {
    console.error("[CMS] legal_pages:", e);
    return [];
  }
}

export async function getLegalPageBySlug(
  slug: string,
): Promise<LegalPage | null> {
  try {
    const directus = getServerDirectus();
    const items = await directus.request(
      readItems("legal_pages", {
        filter: { _and: [publishedOnly, { slug: { _eq: slug } }] },
        limit: 1,
      }),
    );
    const list = asList<LegalPage>(items);
    return list[0] ?? null;
  } catch (e) {
    console.error("[CMS] legal_page:", e);
    return null;
  }
}

export async function getPublishedSponsors(): Promise<Sponsor[]> {
  try {
    const directus = getServerDirectus();
    const items = await directus.request(
      readItems("sponsors", {
        filter: publishedOnly,
        sort: ["sort", "id"],
      }),
    );
    return asList<Sponsor>(items);
  } catch (e) {
    console.error("[CMS] sponsors:", e);
    return [];
  }
}
