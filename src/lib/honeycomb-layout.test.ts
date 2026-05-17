import { describe, expect, it } from "vitest";
import {
  LARGE_HEX_EDGE,
  SMALL_HEX_EDGE,
  generateLayout,
  hexPixelSize,
  layoutHoneycomb,
  mixedSizeCenterDistance,
  sameSizeCenterDistance,
} from "./honeycomb-layout";
import type { SponsorHoneycombItem } from "@/components/sponsors/SponsorHoneycomb";

function mockSponsor(
  id: number,
  hexSize: "small" | "large",
): SponsorHoneycombItem {
  return {
    id,
    name: `S${id}`,
    imageUrl: "/test.png",
    websiteUrl: null,
    hexSize,
  };
}

function minDist(rA: number, rB: number): number {
  if (rA === rB) return sameSizeCenterDistance(rA);
  return mixedSizeCenterDistance(
    Math.max(rA, rB),
    Math.min(rA, rB),
  );
}

function layoutHasNoOverlaps(layout: ReturnType<typeof generateLayout>): boolean {
  for (let i = 0; i < layout.length; i++) {
    for (let j = i + 1; j < layout.length; j++) {
      const a = layout[i]!;
      const b = layout[j]!;
      const d = Math.hypot(b.x - a.x, b.y - a.y);
      if (d < minDist(a.radius, b.radius) - 1) return false;
    }
  }
  return true;
}

function layoutAllConnected(layout: ReturnType<typeof generateLayout>): boolean {
  if (layout.length <= 1) return true;
  const visited = new Set<number>([0]);
  const queue = [0];

  while (queue.length > 0) {
    const i = queue.shift()!;
    for (let j = 0; j < layout.length; j++) {
      if (visited.has(j)) continue;
      const a = layout[i]!;
      const b = layout[j]!;
      const need = minDist(a.radius, b.radius);
      const d = Math.hypot(b.x - a.x, b.y - a.y);
      if (Math.abs(d - need) < 3) {
        visited.add(j);
        queue.push(j);
      }
    }
  }

  return visited.size === layout.length;
}

describe("honeycomb-layout", () => {
  it("large radius is 2× small", () => {
    expect(LARGE_HEX_EDGE).toBe(SMALL_HEX_EDGE * 2);
    const small = hexPixelSize(SMALL_HEX_EDGE);
    const large = hexPixelSize(LARGE_HEX_EDGE);
    expect(large.width).toBeCloseTo(small.width * 2, 5);
  });

  it("generateLayout is deterministic for same seed", () => {
    const a = generateLayout(2, 5, 42);
    const b = generateLayout(2, 5, 42);
    expect(a).toEqual(b);
  });

  it("no overlaps and all connected for mixed layout", () => {
    const layout = generateLayout(3, 8, 99);
    expect(layout.filter((h) => h.type === "large")).toHaveLength(3);
    expect(layout.filter((h) => h.type === "small")).toHaveLength(8);
    expect(layoutHasNoOverlaps(layout)).toBe(true);
    expect(layoutAllConnected(layout)).toBe(true);
  });

  it("small hexes appear in multiple directions around a large", () => {
    const layout = generateLayout(2, 10, 12345);
    const larges = layout.filter((h) => h.type === "large");
    const smalls = layout.filter((h) => h.type === "small");
    expect(larges.length).toBe(2);
    expect(smalls.length).toBe(10);

    const angles = new Set<number>();
    for (const l of larges) {
      for (const s of smalls) {
        const d = Math.hypot(s.x - l.x, s.y - l.y);
        const need = mixedSizeCenterDistance(LARGE_HEX_EDGE, SMALL_HEX_EDGE);
        if (Math.abs(d - need) < 3) {
          angles.add(
            Math.round((Math.atan2(s.y - l.y, s.x - l.x) * 180) / Math.PI / 30),
          );
        }
      }
    }
    expect(angles.size).toBeGreaterThan(2);
  });

  it("layoutHoneycomb assigns all sponsors", () => {
    const sponsors = [
      mockSponsor(1, "large"),
      mockSponsor(2, "large"),
      mockSponsor(3, "small"),
      mockSponsor(4, "small"),
      mockSponsor(5, "small"),
    ];
    const { placed } = layoutHoneycomb(sponsors);
    expect(placed).toHaveLength(5);
  });
});
