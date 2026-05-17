import { cookies } from "next/headers";
import { ADMIN_ROLES, isAdminRole, ROLES } from "@/lib/constants";

export const ADMIN_ROLE_ID = ROLES.ADMIN;

const directusUrl =
  process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://dbbreatouch.phiosk.be";

export interface DirectusUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  status: string;
  role: string | { id: string; name?: string };
}

export function getRoleId(
  role: string | { id: string } | null | undefined,
): string | null {
  if (!role) return null;
  if (typeof role === "string") return role;
  if (typeof role === "object" && "id" in role) return role.id;
  return null;
}

export function isAdmin(user: { role?: string | { id: string } | null } | null) {
  if (!user) return false;
  return isAdminRole(getRoleId(user.role));
}

export async function refreshAccessToken(): Promise<{
  access_token: string;
  refresh_token: string;
  expires: number;
} | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${directusUrl}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken, mode: "json" }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const { access_token, refresh_token, expires } = data.data;
    cookieStore.set("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: Math.floor(expires / 1000),
      path: "/",
    });
    cookieStore.set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    return { access_token, refresh_token, expires };
  } catch (error) {
    console.error("[Auth] Token refresh error:", error);
    return null;
  }
}

export async function getUser(): Promise<DirectusUser | null> {
  const cookieStore = await cookies();
  let token = cookieStore.get("access_token")?.value;
  if (!token) return null;

  try {
    let res = await fetch(`${directusUrl}/users/me?fields=id,email,status,role`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (res.status === 401) {
      const refreshed = await refreshAccessToken();
      if (!refreshed) {
        cookieStore.delete("access_token");
        cookieStore.delete("refresh_token");
        return null;
      }
      token = refreshed.access_token;
      res = await fetch(`${directusUrl}/users/me?fields=id,email,status,role`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
    }

    if (!res.ok) return null;
    const data = await res.json();
    return data.data as DirectusUser;
  } catch (error) {
    console.error("[Auth] Error fetching user:", error);
    return null;
  }
}

export async function getAdminUser(): Promise<DirectusUser | null> {
  const user = await getUser();
  if (!user || !isAdmin(user)) return null;
  return user;
}

export async function validateToken(token: string): Promise<DirectusUser | null> {
  try {
    const res = await fetch(`${directusUrl}/users/me?fields=id,email,status,role`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data as DirectusUser;
  } catch {
    return null;
  }
}

export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}

export { ADMIN_ROLES };
