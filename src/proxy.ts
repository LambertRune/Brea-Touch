import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_CONFIG, PROTECTED_ROUTES } from "@/lib/constants";
import { canAccessAdminPanel, getRoleId, validateToken } from "@/lib/auth";
import { applySecurityHeaders } from "@/lib/security-headers";

const directusUrl =
  process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://dbbreatouch.phiosk.be";

async function tryRefreshToken(refreshToken: string) {
  try {
    const res = await fetch(`${directusUrl}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken, mode: "json" }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? null;
  } catch {
    return null;
  }
}

function secure(response: NextResponse): NextResponse {
  return applySecurityHeaders(response);
}

function createLogoutRedirect(request: NextRequest): NextResponse {
  const loginUrl = new URL("/admin/login", request.url);
  const response = secure(NextResponse.redirect(loginUrl));
  response.cookies.delete(COOKIE_CONFIG.ACCESS_TOKEN);
  response.cookies.delete(COOKIE_CONFIG.REFRESH_TOKEN);
  return response;
}

export async function proxy(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (pathname === "/contact/sponsoring") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/sponsoring-contact";
    return secure(NextResponse.redirect(redirectUrl, 308));
  }

  let token = request.cookies.get(COOKIE_CONFIG.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(COOKIE_CONFIG.REFRESH_TOKEN)?.value;

  let refreshedTokens: {
    access_token: string;
    refresh_token: string;
    expires: number;
  } | null = null;

  if (!token && refreshToken) {
    refreshedTokens = await tryRefreshToken(refreshToken);
    if (refreshedTokens) token = refreshedTokens.access_token;
  }

  const applyRefreshedCookies = (response: NextResponse): NextResponse => {
    if (!refreshedTokens) return response;
    const isProduction = process.env.NODE_ENV === "production";
    const base = {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax" as const,
      path: "/",
    };
    response.cookies.set(
      COOKIE_CONFIG.ACCESS_TOKEN,
      refreshedTokens.access_token,
      { ...base, maxAge: Math.floor(refreshedTokens.expires / 1000) },
    );
    response.cookies.set(
      COOKIE_CONFIG.REFRESH_TOKEN,
      refreshedTokens.refresh_token,
      { ...base, maxAge: 7 * 24 * 60 * 60 },
    );
    return response;
  };

  const isAdminLogin = pathname === "/admin/login";
  const requiresAdmin =
    pathname.startsWith("/admin") &&
    !isAdminLogin;
  const isAdminApi = PROTECTED_ROUTES.ADMIN_API.some((r) =>
    pathname.startsWith(r),
  );

  if (requiresAdmin || isAdminApi) {

    if (!token) {
      if (isAdminApi) {
        return secure(
          NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
        );
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("returnUrl", pathname);
      return secure(NextResponse.redirect(loginUrl));
    }

    let user = await validateToken(token);
    if (!user && refreshToken) {
      const retry = await tryRefreshToken(refreshToken);
      if (retry) {
        refreshedTokens = retry;
        token = retry.access_token;
        user = await validateToken(retry.access_token);
      }
    }

    if (!user || user.status !== "active" || !token) {
      if (isAdminApi) {
        return secure(
          NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
        );
      }
      return createLogoutRedirect(request);
    }

    const canAccess = await canAccessAdminPanel(token, user);
    if (!canAccess) {
      if (isAdminApi) {
        return secure(
          NextResponse.json({ error: "Forbidden" }, { status: 403 }),
        );
      }
      return applyRefreshedCookies(
        secure(NextResponse.redirect(new URL("/", request.url))),
      );
    }

    const roleId = getRoleId(user.role);

    requestHeaders.set("x-user-id", user.id);
    requestHeaders.set("x-user-role", roleId || "");
  }

  if (isAdminLogin && token) {
    const user = await validateToken(token);
    if (user && (await canAccessAdminPanel(token, user))) {
      return applyRefreshedCookies(
        secure(NextResponse.redirect(new URL("/admin", request.url))),
      );
    }
  }

  return applyRefreshedCookies(
    secure(NextResponse.next({ request: { headers: requestHeaders } })),
  );
}

export const config = {
  matcher: [
    "/contact/sponsoring",
    "/admin/:path*",
    "/api/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
