import {
  getServerDirectus,
  readItems,
  readSingleton,
  type LegalPage,
  type OnderzoekItem,
  type SiteSettings,
  type Sponsor,
  type Testimonial,
} from "@/lib/directus";

export { getImageUrl } from "@/lib/directus-url";

/** ISR for all CMS-driven server components (layout footer, pages). */
const publishedOnly = { status: { _eq: "published" as const } };

function logCmsError(collection: string, e: unknown) {
  const message = e instanceof Error ? e.message : String(e);
  console.error(`[CMS] ${collection}:`, message);
}

function asList<T>(value: unknown): T[] {
  return Array.isArray(value) ? value : [];
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const directus = getServerDirectus();
    return await directus.request(readSingleton("site_settings"));
  } catch (e) {
    logCmsError("site_settings", e);
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
    logCmsError("testimonials", e);
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
    logCmsError("legal_pages", e);
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
    logCmsError("legal_page", e);
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
    logCmsError("sponsors", e);
    return [];
  }
}

export async function getPublishedOnderzoekItems(): Promise<OnderzoekItem[]> {
  try {
    const directus = getServerDirectus();
    const items = await directus.request(
      readItems("onderzoek_items", {
        filter: publishedOnly,
        sort: ["sort", "id"],
      }),
    );
    return asList<OnderzoekItem>(items);
  } catch (e) {
    logCmsError("onderzoek_items", e);
    return [];
  }
}

export async function getOnderzoekItemBySlug(
  slug: string,
): Promise<OnderzoekItem | null> {
  try {
    const directus = getServerDirectus();
    const items = await directus.request(
      readItems("onderzoek_items", {
        filter: { _and: [publishedOnly, { slug: { _eq: slug } }] },
        limit: 1,
      }),
    );
    const list = asList<OnderzoekItem>(items);
    return list[0] ?? null;
  } catch (e) {
    logCmsError("onderzoek_item", e);
    return null;
  }
}
