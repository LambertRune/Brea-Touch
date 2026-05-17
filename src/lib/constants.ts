/** Directus Public role — never allowed in the website admin panel. */
export const PUBLIC_ROLE_ID = "ddf8a1c8-c157-4952-8ed7-7535ef12d6dd";

function parseRoleIds(envValue: string | undefined, fallback: string): string[] {
  const raw = envValue?.trim() || fallback;
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

export const ROLES = {
  ADMIN: parseRoleIds(
    process.env.NEXT_PUBLIC_ADMIN_ROLE_IDS ||
      process.env.NEXT_PUBLIC_ADMIN_ROLE_ID,
    "074cbcf7-cd67-4ba1-ab76-e43ccfe40a84",
  ),
} as const;

export const ADMIN_ROLES = ROLES.ADMIN;

export const PROTECTED_ROUTES = {
  ADMIN_REQUIRED: ["/admin"],
  ADMIN_API: ["/api/admin"],
} as const;

export const COOKIE_CONFIG = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

export function isAdminRole(roleId: string | null | undefined): boolean {
  if (!roleId || roleId === PUBLIC_ROLE_ID) return false;
  return (ADMIN_ROLES as readonly string[]).includes(roleId);
}

export function pathMatches(
  path: string,
  patterns: readonly string[],
): boolean {
  return patterns.some((pattern) => path.startsWith(pattern));
}
