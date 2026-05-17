"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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

  const layoutWidth = Math.max(width, 200);
  const layoutHeight = Math.max(height, 120);

  const grid = (
    <ScaledHoneycomb
      layoutWidth={layoutWidth}
      layoutHeight={layoutHeight}
      embedded={embedded}
    >
      {placed.map((item) => (
        <HexCell key={item.sponsor.id} item={item} />
      ))}
    </ScaledHoneycomb>
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

function ScaledHoneycomb({
  layoutWidth,
  layoutHeight,
  embedded,
  children,
}: {
  layoutWidth: number;
  layoutHeight: number;
  embedded: boolean;
  children: ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => {
      const available = el.clientWidth;
      if (available <= 0) return;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const inset = isMobile ? 16 : 0;
      setScale(Math.min(1, Math.max(0.3, (available - inset) / layoutWidth)));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [layoutWidth]);

  const scaledW = layoutWidth * scale;
  const scaledH = layoutHeight * scale;

  return (
    <div ref={viewportRef} className={styles.honeycombViewport}>
      <div
        className={styles.honeycombSizer}
        style={{ width: scaledW, height: scaledH }}
      >
        <div
          className={`${styles.honeycomb}${embedded ? ` ${styles.honeycombEmbedded}` : ""}`}
          style={{
            width: layoutWidth,
            height: layoutHeight,
            transform: `scale(${scale})`,
          }}
          role="list"
        >
          {children}
        </div>
      </div>
    </div>
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
    let objectUrl: string | undefined;

    void (async () => {
      try {
        const proxy = `/api/sponsor-image-proxy?url=${encodeURIComponent(imageUrl)}`;
        const res = await fetch(proxy);
        if (!res.ok || cancelled) return;

        const blob = await res.blob();
        objectUrl = URL.createObjectURL(blob);

        const img = new Image();
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("decode failed"));
          img.src = objectUrl!;
        });

        if (cancelled) return;
        const colors = readDominantColorsFromImage(img);
        if (!colors?.length) return;
        setGradient(buildSoftHexGradient(colors));
      } catch {
        /* proxy/decode failed – white fallback */
      } finally {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [imageUrl]);

  return gradient;
}
