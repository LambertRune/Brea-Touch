"use client";

import { useEffect, useMemo, useState } from "react";
import {
  buildSoftHexGradient,
  readDominantColorsFromImage,
} from "@/lib/image-gradient";
import {
  hexPixelSize,
  layoutHoneycomb,
  type PlacedHex,
} from "@/lib/honeycomb-layout";
import styles from "./SponsorHoneycomb.module.css";

export type SponsorHoneycombItem = {
  id: number;
  name: string;
  imageUrl: string;
  websiteUrl: string | null;
  hexSize: "small" | "large";
};

export function SponsorHoneycomb({
  sponsors,
  embedded = false,
}: {
  sponsors: SponsorHoneycombItem[];
  embedded?: boolean;
}) {
  const { placed, width, height } = useMemo(
    () => layoutHoneycomb(sponsors),
    [sponsors],
  );

  if (placed.length === 0) return null;

  const grid = (
    <div
      className={`${styles.honeycomb}${embedded ? ` ${styles.honeycombEmbedded}` : ""}`}
      style={{ width: Math.max(width, 200), height: Math.max(height, 120) }}
      role="list"
    >
      {placed.map((item) => (
        <HexCell key={item.sponsor.id} item={item} />
      ))}
    </div>
  );

  if (embedded) {
    return grid;
  }

  return (
    <section className={styles.section} aria-label="Onze sponsors">
      <div className="container text-center">
        <span className="badge badge--yellow">Partners</span>
        <h2 className={styles.title}>Onze sponsors</h2>
        <div className="divider divider--center" />
        {grid}
      </div>
    </section>
  );
}

const BORDER_CLASS: Record<PlacedHex["borderColor"], string> = {
  green: styles.borderGreen,
  olive: styles.borderOlive,
  rose: styles.borderRose,
  brown: styles.borderBrown,
};

function HexCell({ item }: { item: PlacedHex }) {
  const { sponsor, x, y, edge, borderColor } = item;
  const { width, height } = hexPixelSize(edge);
  const borderClass = BORDER_CLASS[borderColor];
  const sizeModifier =
    sponsor.hexSize === "large" ? styles.hexLarge : styles.hexSmall;
  const gradient = useImageGradient(sponsor.imageUrl);

  const style = {
    left: x - width / 2,
    top: y - height / 2,
    width,
    height,
  } as const;

  const inner = (
    <div
      className={styles.hexInner}
      style={gradient ? { background: gradient } : undefined}
    >
      <div className={styles.hexLogoWrap} aria-hidden>
        <img
          src={sponsor.imageUrl}
          alt=""
          className={styles.hexImage}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={styles.hexHoverOverlay}>
        <span className={styles.hexName}>{sponsor.name}</span>
      </div>
    </div>
  );

  const className = [styles.hex, borderClass, sizeModifier].join(" ");

  if (sponsor.websiteUrl) {
    return (
      <a
        href={sponsor.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
        role="listitem"
        aria-label={sponsor.name}
        title={sponsor.name}
      >
        {inner}
      </a>
    );
  }

  return (
    <div
      className={className}
      style={style}
      role="listitem"
      aria-label={sponsor.name}
      title={sponsor.name}
    >
      {inner}
    </div>
  );
}

/* ── colour-extraction gradient hook ───────────────────────────── */

function useImageGradient(imageUrl: string): string | undefined {
  const [gradient, setGradient] = useState<string>();

  useEffect(() => {
    if (!imageUrl) return;
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      try {
        const colors = readDominantColorsFromImage(img);
        if (!colors?.length) return;
        setGradient(buildSoftHexGradient(colors));
      } catch {
        /* CORS – keep white fallback */
      }
    };
    img.src = imageUrl;
    return () => {
      cancelled = true;
    };
  }, [imageUrl]);

  return gradient;
}
