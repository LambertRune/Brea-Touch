/** Single source of truth — update agent.md “Social media” when changing URLs. */
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

export const SOCIAL_LINK_LIST = [
  SOCIAL_LINKS.instagram,
  SOCIAL_LINKS.tiktok,
  SOCIAL_LINKS.linkedin,
] as const;
