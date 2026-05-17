export type Rgb = readonly [number, number, number];

const GRADIENT_OPACITY = 0.2;
const MIN_COLOR_DISTANCE = 48;

/** Two dominant colors → soft radial tint over white (letterbox areas). */
export function buildSoftHexGradient(
  colors: readonly Rgb[],
  opacity = GRADIENT_OPACITY,
): string {
  const [a, b] = normalizePair(colors);
  const c1 = `rgba(${a[0]}, ${a[1]}, ${a[2]}, ${opacity})`;
  const c2 = `rgba(${b[0]}, ${b[1]}, ${b[2]}, ${opacity})`;
  return `radial-gradient(ellipse at 42% 38%, ${c1} 0%, ${c2} 62%, ${c1} 100%), #ffffff`;
}

export function extractDominantColors(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  count = 2,
): Rgb[] {
  const buckets = new Map<
    number,
    { n: number; r: number; g: number; b: number }
  >();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const alpha = data[i + 3];
      if (alpha < 128) continue;

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const sum = r + g + b;
      if (sum < 35 || sum > 725) continue;

      const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
      const bucket = buckets.get(key);
      if (bucket) {
        bucket.n++;
        bucket.r += r;
        bucket.g += g;
        bucket.b += b;
      } else {
        buckets.set(key, { n: 1, r, g, b });
      }
    }
  }

  const ranked = [...buckets.values()]
    .map((b) =>
      [
        Math.round(b.r / b.n),
        Math.round(b.g / b.n),
        Math.round(b.b / b.n),
        b.n,
      ] as const,
    )
    .sort((x, y) => y[3] - x[3]);

  if (ranked.length === 0) return [[210, 210, 210], [230, 230, 230]];

  const picked: Rgb[] = [];
  for (const [r, g, b] of ranked) {
    const rgb: Rgb = [r, g, b];
    if (
      picked.every((existing) => colorDistance(existing, rgb) >= MIN_COLOR_DISTANCE)
    ) {
      picked.push(rgb);
      if (picked.length >= count) break;
    }
  }

  while (picked.length < count) {
    const base = picked[0] ?? ([210, 210, 210] as const);
    picked.push(shiftRgb(base, picked.length * 18));
  }

  return picked.slice(0, count);
}

export function readDominantColorsFromImage(
  img: HTMLImageElement,
  sampleSize = 32,
): Rgb[] | null {
  const canvas = document.createElement("canvas");
  canvas.width = sampleSize;
  canvas.height = sampleSize;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
  const { data } = ctx.getImageData(0, 0, sampleSize, sampleSize);
  return extractDominantColors(data, sampleSize, sampleSize, 2);
}

function normalizePair(colors: readonly Rgb[]): [Rgb, Rgb] {
  const a = colors[0] ?? ([210, 210, 210] as const);
  const b = colors[1] ?? shiftRgb(a, 24);
  return [a, b];
}

function shiftRgb([r, g, b]: Rgb, amount: number): Rgb {
  return [
    clampByte(r + amount),
    clampByte(g + amount * 0.6),
    clampByte(b - amount * 0.4),
  ];
}

function clampByte(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v)));
}

function colorDistance(a: Rgb, b: Rgb): number {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}
