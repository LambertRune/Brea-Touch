/** Client-safe Directus URL helpers (no server token / SDK). */

export const directusUrl =
  process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://dbbreatouch.phiosk.be";

export function getImageUrl(
  fileId: string | null | undefined,
  params?: string,
): string | null {
  if (!fileId) return null;
  const query = params ? `?${params}` : "";
  return `${directusUrl}/assets/${fileId}${query}`;
}
