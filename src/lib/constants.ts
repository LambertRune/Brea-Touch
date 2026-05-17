export const ROLES = {
  ADMIN:
    process.env.NEXT_PUBLIC_ADMIN_ROLE_ID ||
    "074cbcf7-cd67-4ba1-ab76-e43ccfe40a84",
} as const;

export const ADMIN_ROLES = [ROLES.ADMIN] as const;

export const PROTECTED_ROUTES = {
  ADMIN_REQUIRED: ["/admin"],
  ADMIN_API: ["/api/admin"],
} as const;

export const COOKIE_CONFIG = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

export function isAdminRole(roleId: string | null | undefined): boolean {
  if (!roleId) return false;
  return ADMIN_ROLES.includes(roleId as (typeof ADMIN_ROLES)[number]);
}

export function pathMatches(
  path: string,
  patterns: readonly string[],
): boolean {
  return patterns.some((pattern) => path.startsWith(pattern));
}
