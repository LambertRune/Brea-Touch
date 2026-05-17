import type { SponsorHoneycombItem } from "@/components/sponsors/SponsorHoneycomb";

export type HexBorderColor = "green" | "olive" | "rose" | "brown";

export type PlacedHex = {
  sponsor: SponsorHoneycombItem;
  x: number;
  y: number;
  edge: number;
  borderColor: HexBorderColor;
};

export type HexSize = "small" | "large";

export type LayoutHex = {
  x: number;
  y: number;
  /** Zijlengte / circumradius (pointy-top). */
  radius: number;
  type: HexSize;
};

const BORDER_COLORS: HexBorderColor[] = ["green", "olive", "rose", "brown"];

export const SMALL_HEX_EDGE = 48;
export const LARGE_HEX_EDGE = SMALL_HEX_EDGE * 2;
export const HEX_GAP = 4;

const AXIAL_DIRS: [number, number][] = [
  [1, 0],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [0, -1],
  [1, -1],
];

const DIR_UNITS = AXIAL_DIRS.map(([dq, dr]) => {
  const ux = Math.sqrt(3) * (dq + dr / 2);
  const uy = 1.5 * dr;
  const len = Math.hypot(ux, uy);
  return { x: ux / len, y: uy / len };
});

export function sameSizeCenterDistance(radius: number): number {
  return radius * Math.sqrt(3) + HEX_GAP;
}

export function mixedSizeCenterDistance(
  largeRadius: number,
  smallRadius: number,
): number {
  return largeRadius + smallRadius + HEX_GAP;
}

export const SMALL_DX = sameSizeCenterDistance(SMALL_HEX_EDGE);
export const SMALL_DY = (SMALL_DX * Math.sqrt(3)) / 3;

export function hexPixelSize(edge: number): { width: number; height: number } {
  return {
    width: Math.sqrt(3) * edge,
    height: 2 * edge,
  };
}

export function axialToPixel(q: number, r: number): { x: number; y: number } {
  return {
    x: SMALL_DX * (q + r / 2),
    y: SMALL_DY * r,
  };
}

export function offsetAlongAxial(
  dq: number,
  dr: number,
  distance: number,
): { x: number; y: number } {
  const ux = Math.sqrt(3) * (dq + dr / 2);
  const uy = 1.5 * dr;
  const len = Math.hypot(ux, uy);
  if (len < 1e-9) return { x: 0, y: 0 };
  return { x: (ux / len) * distance, y: (uy / len) * distance };
}

function hashSponsors(sponsors: SponsorHoneycombItem[]): number {
  let hash = 2166136261;
  for (const sponsor of sponsors) {
    const text = `${sponsor.id}:${sponsor.name}:${sponsor.hexSize}`;
    for (let i = 0; i < text.length; i++) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
  }
  return hash >>> 0;
}

export function createRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleInPlace<T>(items: T[], rng: () => number): void {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [items[i], items[j]] = [items[j]!, items[i]!];
  }
}

function minCenterDistance(radiusA: number, radiusB: number): number {
  if (Math.abs(radiusA - radiusB) < 0.01) {
    return sameSizeCenterDistance(radiusA);
  }
  const large = Math.max(radiusA, radiusB);
  const small = Math.min(radiusA, radiusB);
  return mixedSizeCenterDistance(large, small);
}

function centerDistance(a: LayoutHex, b: LayoutHex): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function overlaps(a: LayoutHex, b: LayoutHex): boolean {
  return (
    centerDistance(a, b) < minCenterDistance(a.radius, b.radius) - 0.5
  );
}

function fits(placed: LayoutHex[], candidate: LayoutHex): boolean {
  return placed.every((p) => !overlaps(p, candidate));
}

function touches(placed: LayoutHex[], candidate: LayoutHex): boolean {
  return placed.some((p) => {
    const need = minCenterDistance(p.radius, candidate.radius);
    return Math.abs(centerDistance(p, candidate) - need) < 2.5;
  });
}

function posKey(x: number, y: number): string {
  return `${Math.round(x * 2)}:${Math.round(y * 2)}`;
}

function neighborAt(
  base: { x: number; y: number },
  dirIndex: number,
  distance: number,
): { x: number; y: number } {
  const d = DIR_UNITS[dirIndex]!;
  return { x: base.x + d.x * distance, y: base.y + d.y * distance };
}

function pocketCenters(a: LayoutHex, b: LayoutHex): { x: number; y: number }[] {
  if (a.type !== "large" || b.type !== "large") return [];

  const R = LARGE_HEX_EDGE;
  const touch = mixedSizeCenterDistance(R, SMALL_HEX_EDGE);
  const d = centerDistance(a, b);

  const minLarge = sameSizeCenterDistance(R) * 0.85;
  const maxLarge =
    sameSizeCenterDistance(R) * 1.35 + mixedSizeCenterDistance(R, SMALL_HEX_EDGE);
  if (d < minLarge || d > maxLarge) return [];

  const half = d / 2;
  const disc = touch * touch - half * half;
  if (disc < 1) return [];

  const h = Math.sqrt(disc);
  const midX = (a.x + b.x) / 2;
  const midY = (a.y + b.y) / 2;
  const nx = (b.x - a.x) / d;
  const ny = (b.y - a.y) / d;
  const px = -ny;
  const py = nx;

  return [
    { x: midX + px * h, y: midY + py * h },
    { x: midX - px * h, y: midY - py * h },
  ];
}

function makeHex(x: number, y: number, type: HexSize): LayoutHex {
  return {
    x,
    y,
    radius: type === "large" ? LARGE_HEX_EDGE : SMALL_HEX_EDGE,
    type,
  };
}

function placeLargeHexagons(count: number, rng: () => number): LayoutHex[] {
  if (count <= 0) return [];

  const distLL = sameSizeCenterDistance(LARGE_HEX_EDGE);
  const placed: LayoutHex[] = [makeHex(0, 0, "large")];

  while (placed.length < count) {
    const candidates: LayoutHex[] = [];
    const seen = new Set<string>();

    for (const hex of placed) {
      if (hex.type !== "large") continue;
      for (let dir = 0; dir < 6; dir++) {
        const p = neighborAt(hex, dir, distLL);
        const key = posKey(p.x, p.y);
        if (seen.has(key)) continue;
        seen.add(key);
        candidates.push(makeHex(p.x, p.y, "large"));
      }
    }

    shuffleInPlace(candidates, rng);

    let added = false;
    for (const c of candidates) {
      if (fits(placed, c) && touches(placed, c)) {
        placed.push(c);
        added = true;
        break;
      }
    }

    if (!added) break;
  }

  return placed;
}

function placeSmallOnly(count: number, rng: () => number): LayoutHex[] {
  if (count <= 0) return [];
  const dist = sameSizeCenterDistance(SMALL_HEX_EDGE);
  const placed: LayoutHex[] = [makeHex(0, 0, "small")];

  while (placed.length < count) {
    const candidates: LayoutHex[] = [];
    const seen = new Set<string>();

    for (const hex of placed) {
      for (let dir = 0; dir < 6; dir++) {
        const p = neighborAt(hex, dir, dist);
        const key = posKey(p.x, p.y);
        if (seen.has(key)) continue;
        seen.add(key);
        candidates.push(makeHex(p.x, p.y, "small"));
      }
    }

    shuffleInPlace(candidates, rng);

    let added = false;
    for (const c of candidates) {
      if (fits(placed, c) && touches(placed, c)) {
        placed.push(c);
        added = true;
        break;
      }
    }

    if (!added) break;
  }

  return placed;
}

function collectSmallCandidates(placed: LayoutHex[]): LayoutHex[] {
  const R = LARGE_HEX_EDGE;
  const r = SMALL_HEX_EDGE;
  const distLS = mixedSizeCenterDistance(R, r);
  const distSS = sameSizeCenterDistance(r);
  const candidates: LayoutHex[] = [];
  const seen = new Set<string>();

  const add = (x: number, y: number) => {
    const key = posKey(x, y);
    if (seen.has(key)) return;
    seen.add(key);
    candidates.push(makeHex(x, y, "small"));
  };

  for (const hex of placed) {
    for (let dir = 0; dir < 6; dir++) {
      if (hex.type === "large") {
        const p = neighborAt(hex, dir, distLS);
        add(p.x, p.y);
      } else {
        const p = neighborAt(hex, dir, distSS);
        add(p.x, p.y);
      }
    }
  }

  const larges = placed.filter((h) => h.type === "large");
  for (let i = 0; i < larges.length; i++) {
    for (let j = i + 1; j < larges.length; j++) {
      for (const p of pocketCenters(larges[i]!, larges[j]!)) {
        add(p.x, p.y);
      }
    }
  }

  return candidates;
}

function placeSmallHexagons(
  placed: LayoutHex[],
  count: number,
  rng: () => number,
): void {
  let added = 0;
  let stagnant = 0;

  while (added < count && stagnant < 8) {
    const candidates = collectSmallCandidates(placed);
    shuffleInPlace(candidates, rng);

    let roundAdded = 0;
    for (const c of candidates) {
      if (added >= count) break;
      if (!fits(placed, c) || !touches(placed, c)) continue;
      placed.push(c);
      added++;
      roundAdded++;
    }

    stagnant = roundAdded === 0 ? stagnant + 1 : 0;
  }
}

/**
 * Seeded layout: grote hexen eerst (6 richtingen), kleine rondom + in zakken.
 */
export function generateLayout(
  largeCount: number,
  smallCount: number,
  seed: number,
): LayoutHex[] {
  const rng = createRng(seed);

  if (largeCount === 0) {
    return placeSmallOnly(smallCount, rng);
  }

  const placed = placeLargeHexagons(largeCount, rng);
  if (smallCount > 0) {
    placeSmallHexagons(placed, smallCount, rng);
  }

  return placed;
}

export function generateSlots(
  largeCount: number,
  smallCount: number,
  seed: number,
): LayoutHex[] {
  return generateLayout(largeCount, smallCount, seed);
}

export function layoutHoneycomb(
  sponsors: SponsorHoneycombItem[],
): { placed: PlacedHex[]; width: number; height: number } {
  if (sponsors.length === 0) {
    return { placed: [], width: 0, height: 0 };
  }

  const largeSponsors = sponsors.filter((s) => s.hexSize === "large");
  const smallSponsors = sponsors.filter((s) => s.hexSize === "small");
  const seed = hashSponsors(sponsors);
  const rng = createRng(seed);

  const layout = generateLayout(
    largeSponsors.length,
    smallSponsors.length,
    seed,
  );

  const shuffledLarge = [...largeSponsors];
  const shuffledSmall = [...smallSponsors];
  shuffleInPlace(shuffledLarge, rng);
  shuffleInPlace(shuffledSmall, rng);

  const placed: PlacedHex[] = [];
  let largeIdx = 0;
  let smallIdx = 0;

  for (let i = 0; i < layout.length; i++) {
    const slot = layout[i]!;
    const sponsor =
      slot.type === "large"
        ? shuffledLarge[largeIdx++]
        : shuffledSmall[smallIdx++];
    if (!sponsor) continue;

    placed.push({
      sponsor,
      x: slot.x,
      y: slot.y,
      edge: slot.radius,
      borderColor: BORDER_COLORS[i % BORDER_COLORS.length]!,
    });
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const item of placed) {
    const { width, height } = hexPixelSize(item.edge);
    minX = Math.min(minX, item.x - width / 2);
    minY = Math.min(minY, item.y - height / 2);
    maxX = Math.max(maxX, item.x + width / 2);
    maxY = Math.max(maxY, item.y + height / 2);
  }

  const pad = 10;
  const offsetX = -minX + pad;
  const offsetY = -minY + pad;
  const normalized = placed.map((item) => ({
    ...item,
    x: item.x + offsetX,
    y: item.y + offsetY,
  }));

  return {
    placed: normalized,
    width: maxX - minX + pad * 2,
    height: maxY - minY + pad * 2,
  };
}
