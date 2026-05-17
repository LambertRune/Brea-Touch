/** Single source of truth — update agent.md “Social media” when changing URLs. */
export type SocialNetwork = "instagram" | "tiktok" | "linkedin";

export const SOCIAL_LINKS = {
  instagram: {
    href: "https://www.instagram.com/breatouch",
    label: "Instagram",
    handle: "@breatouch",
    ariaLabel: "Instagram",
  },
  tiktok: {
    href: "https://www.tiktok.com/@breatouch?_r=1&_t=ZG-957Tpu0syAq",
    label: "TikTok",
    handle: "@breatouch",
    ariaLabel: "TikTok",
  },
  linkedin: {
    href: "https://www.linkedin.com/in/bréatouch-borstkankerpreventie-8797093b9",
    label: "LinkedIn",
    handle: "BréaTouch",
    ariaLabel: "LinkedIn",
  },
} as const;

export const SOCIAL_LINK_LIST: {
  network: SocialNetwork;
  href: string;
  label: string;
  ariaLabel: string;
}[] = [
  { network: "instagram", ...SOCIAL_LINKS.instagram },
  { network: "tiktok", ...SOCIAL_LINKS.tiktok },
  { network: "linkedin", ...SOCIAL_LINKS.linkedin },
];
