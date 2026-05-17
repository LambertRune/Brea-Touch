/** Contactstrip SVGs + Lucide tier-iconen (sponsorfiche) */

import { Clover, Diamond, Gem, Heart } from "lucide-react";
import styles from "./page.module.css";

const TIER_ICON_SIZE = 34;
const TIER_ICON_STROKE = 2.15;

export function TierIconHeart() {
  return (
    <Heart
      size={TIER_ICON_SIZE}
      strokeWidth={TIER_ICON_STROKE}
      color="#fff"
      aria-hidden
    />
  );
}

export function TierIconClover() {
  return (
    <Clover
      size={TIER_ICON_SIZE}
      strokeWidth={TIER_ICON_STROKE}
      color="#fff"
      aria-hidden
    />
  );
}

/** Zilver: twee diamonds naast elkaar */
export function TierIconDiamondsPair() {
  return (
    <span className={styles.tierLucidePair} aria-hidden>
      <Diamond size={28} strokeWidth={TIER_ICON_STROKE} color="#fff" />
      <Diamond size={28} strokeWidth={TIER_ICON_STROKE} color="#fff" />
    </span>
  );
}

export function TierIconGem() {
  return (
    <Gem
      size={TIER_ICON_SIZE}
      strokeWidth={TIER_ICON_STROKE}
      color="#fff"
      aria-hidden
    />
  );
}

export function IconMail() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <polyline
        points="22,6 12,13 2,6"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function IconGlobe() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function IconInstagram() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <line
        x1="17.5"
        y1="6.5"
        x2="17.51"
        y2="6.5"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function IconTikTok() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.14a8.16 8.16 0 0 0 3.76.92V6.69z" />
    </svg>
  );
}
