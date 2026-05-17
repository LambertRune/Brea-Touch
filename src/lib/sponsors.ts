import { getImageUrl } from "@/lib/directus-url";
import type { Sponsor } from "@/lib/directus";
import type { SponsorHoneycombItem } from "@/components/sponsors/SponsorHoneycomb";

export function mapSponsorsToHoneycomb(
  sponsors: Sponsor[],
): SponsorHoneycombItem[] {
  return sponsors
    .map((s) => {
      const imageUrl = getImageUrl(
        s.photo,
        "width=400&height=400&fit=inside",
      );
      if (!imageUrl) return null;
      return {
        id: s.id,
        name: s.name,
        imageUrl,
        websiteUrl: s.website_url,
        hexSize: s.hex_size,
      };
    })
    .filter((s): s is SponsorHoneycombItem => s !== null);
}
