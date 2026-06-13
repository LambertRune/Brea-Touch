import {
  createDirectus,
  createItem,
  deleteItem,
  readItem,
  readItems,
  readSingleton,
  rest,
  staticToken,
  updateItem,
  updateSingleton,
} from "@directus/sdk";

export interface SiteSettings {
  id: number;
  about_image: string | null;
  about_body: string | null;
}

export interface Testimonial {
  id: number;
  quote: string;
  sort: number | null;
  status: string;
}

export interface LegalPage {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  sort: number | null;
  status: string;
}

export interface Sponsor {
  id: number;
  name: string;
  photo: string;
  website_url: string | null;
  hex_size: "small" | "large";
  sort: number | null;
  status: string;
}

export type OnderzoekKind = "brochure" | "article";
export type OnderzoekLanguage = "nl" | "en";

export interface OnderzoekItem {
  id: number;
  title: string;
  slug: string;
  kind: OnderzoekKind;
  excerpt: string | null;
  body: string | null;
  brochure_file: string | null;
  language: OnderzoekLanguage;
  sort: number | null;
  status: string;
}

export interface Schema {
  site_settings: SiteSettings;
  testimonials: Testimonial[];
  legal_pages: LegalPage[];
  sponsors: Sponsor[];
  onderzoek_items: OnderzoekItem[];
}

import { directusUrl, getImageUrl } from "@/lib/directus-url";

export { directusUrl, getImageUrl };

const directusTimeoutMs = Number(process.env.DIRECTUS_TIMEOUT_MS) || 15_000;

const restOptions = {
  onRequest: (options: RequestInit) => ({
    ...options,
    cache: "no-store" as RequestCache,
    signal: options.signal ?? AbortSignal.timeout(directusTimeoutMs),
  }),
};

export const client = createDirectus<Schema>(directusUrl).with(rest(restOptions));

export function getServerDirectus() {
  const token = process.env.DIRECTUS_TOKEN;
  if (!token) {
    const msg =
      "[directus] DIRECTUS_TOKEN is not set — sponsors/legal_pages/onderzoek_items need it (public read is 403).";
    if (process.env.NODE_ENV === "production") {
      console.error(msg);
    } else {
      console.warn(msg);
    }
    return createDirectus<Schema>(directusUrl).with(rest(restOptions));
  }
  return createDirectus<Schema>(directusUrl)
    .with(staticToken(token))
    .with(rest(restOptions));
}

export {
  createItem,
  deleteItem,
  readItem,
  readItems,
  readSingleton,
  updateItem,
  updateSingleton,
};
