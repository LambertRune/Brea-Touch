/** Same-origin admin proxy for Directus file previews (avoids CSP / auth issues). */
export function getAdminAssetUrl(
  fileId: string | null | undefined,
  transform?: string,
): string | null {
  if (!fileId) return null;
  const params = new URLSearchParams({ id: fileId });
  if (transform) params.set("transform", transform);
  return `/api/admin/asset?${params.toString()}`;
}
