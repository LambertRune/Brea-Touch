import {
  getServerDirectus,
  readItems,
  readSingleton,
  type LegalPage,
  type SiteSettings,
  type Sponsor,
  type Testimonial,
} from "@/lib/directus";

export type AdminLoadResult<T> = {
  data: T;
  error: string | null;
};

const CMS_UNAVAILABLE =
  "Geen verbinding met Directus. Controleer je netwerk of probeer het later opnieuw.";

function loadError(e: unknown): string {
  const cause = e instanceof Error && "cause" in e ? e.cause : e;
  const code =
    cause &&
    typeof cause === "object" &&
    "code" in cause &&
    typeof cause.code === "string"
      ? cause.code
      : null;
  if (code === "ETIMEDOUT" || code === "ECONNREFUSED") {
    return CMS_UNAVAILABLE;
  }
  return CMS_UNAVAILABLE;
}

export async function loadAdminSiteSettings(): Promise<
  AdminLoadResult<SiteSettings | null>
> {
  try {
    const directus = getServerDirectus();
    const data = await directus.request(readSingleton("site_settings"));
    return { data, error: null };
  } catch (e) {
    console.error("[Admin CMS] site_settings:", e);
    return { data: null, error: loadError(e) };
  }
}

export async function loadAdminTestimonials(): Promise<
  AdminLoadResult<Testimonial[]>
> {
  try {
    const directus = getServerDirectus();
    const data = await directus.request(
      readItems("testimonials", {
        sort: ["sort", "id"],
        fields: ["id", "quote", "sort", "status"],
      }),
    );
    return { data, error: null };
  } catch (e) {
    console.error("[Admin CMS] testimonials:", e);
    return { data: [], error: loadError(e) };
  }
}

export async function loadAdminLegalPages(): Promise<
  AdminLoadResult<LegalPage[]>
> {
  try {
    const directus = getServerDirectus();
    const data = await directus.request(
      readItems("legal_pages", {
        sort: ["sort", "id"],
        fields: ["id", "title", "slug", "content", "sort", "status"],
      }),
    );
    return { data, error: null };
  } catch (e) {
    console.error("[Admin CMS] legal_pages:", e);
    return { data: [], error: loadError(e) };
  }
}

export async function loadAdminSponsors(): Promise<AdminLoadResult<Sponsor[]>> {
  try {
    const directus = getServerDirectus();
    const data = await directus.request(
      readItems("sponsors", {
        sort: ["sort", "id"],
        fields: [
          "id",
          "name",
          "photo",
          "website_url",
          "hex_size",
          "sort",
          "status",
        ],
      }),
    );
    return { data, error: null };
  } catch (e) {
    console.error("[Admin CMS] sponsors:", e);
    return { data: [], error: loadError(e) };
  }
}
