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

/** Only our Directus /assets URLs (for same-origin proxy). */
export function isAllowedDirectusAssetUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const base = new URL(directusUrl);
    return (
      parsed.origin === base.origin &&
      parsed.pathname.startsWith("/assets/") &&
      !parsed.username &&
      !parsed.password
    );
  } catch {
    return false;
  }
}
