import type { MetadataRoute } from "next";
import { getPublishedLegalPages, getPublishedOnderzoekItems } from "@/lib/cms";
import { absoluteUrl } from "@/lib/site-url";

const STATIC_PAGES: ReadonlyArray<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/missie-visie", changeFrequency: "monthly", priority: 0.8 },
  { path: "/onderzoek", changeFrequency: "weekly", priority: 0.85 },
  { path: "/doe-mee", changeFrequency: "monthly", priority: 0.8 },
  { path: "/sponsoring-contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [legalPages, onderzoekItems] = await Promise.all([
    getPublishedLegalPages(),
    getPublishedOnderzoekItems(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map(
    ({ path, changeFrequency, priority }) => ({
      url: absoluteUrl(path),
      changeFrequency,
      priority,
    }),
  );

  const legalEntries: MetadataRoute.Sitemap = legalPages.map((page) => ({
    url: absoluteUrl(`/voorwaarden/${page.slug}`),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const onderzoekEntries: MetadataRoute.Sitemap = onderzoekItems.map((item) => ({
    url: absoluteUrl(`/onderzoek/${item.slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...onderzoekEntries, ...legalEntries];
}
