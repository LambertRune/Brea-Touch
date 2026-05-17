import { describe, expect, it } from "vitest";
import {
  buildSoftHexGradient,
  extractDominantColors,
} from "./image-gradient";

describe("extractDominantColors", () => {
  it("picks two distinct frequent colors", () => {
    const w = 4;
    const h = 4;
    const data = new Uint8ClampedArray(w * h * 4);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const red = x < 2;
        data[i] = red ? 200 : 20;
        data[i + 1] = red ? 30 : 180;
        data[i + 2] = red ? 40 : 60;
        data[i + 3] = 255;
      }
    }
    const colors = extractDominantColors(data, w, h, 2);
    expect(colors).toHaveLength(2);
    expect(colors[0]).not.toEqual(colors[1]);
  });
});

describe("buildSoftHexGradient", () => {
  it("uses low-opacity rgba over white", () => {
    const gradient = buildSoftHexGradient(
      [
        [120, 40, 30],
        [20, 160, 90],
      ],
      0.2,
    );
    expect(gradient).toContain("rgba(120, 40, 30, 0.2)");
    expect(gradient).toContain("#ffffff");
  });
});
