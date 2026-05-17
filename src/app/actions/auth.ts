"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { directusUrl } from "@/lib/directus-url";
import { canAccessAdminPanel, clearAuthCookies, validateToken } from "@/lib/auth";

export async function loginAction(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const returnUrl = String(formData.get("returnUrl") || "/admin");

  if (!email || !password) {
    return { error: "E-mail en wachtwoord zijn verplicht." };
  }

  try {
    const res = await fetch(`${directusUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      return {
        error:
          data.errors?.[0]?.message ||
          "Inloggen mislukt. Controleer je gegevens.",
      };
    }

    const { access_token, refresh_token, expires } = data.data;
    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === "production";

    cookieStore.set("access_token", access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: Math.floor(expires / 1000),
      path: "/",
    });
    cookieStore.set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    const user = await validateToken(access_token);
    if (!user || !(await canAccessAdminPanel(access_token, user))) {
      await clearAuthCookies();
      return {
        error:
          "Geen toegang tot het beheerpaneel. Je Directus-rol moet app-toegang hebben.",
      };
    }
  } catch (e) {
    console.error("[loginAction]", e);
    return { error: "Er ging iets mis. Probeer het later opnieuw." };
  }

  const safe =
    returnUrl.startsWith("/admin") && !returnUrl.startsWith("//")
      ? returnUrl
      : "/admin";

  // useActionState + redirect() causes "unexpected response" on the client
  return { ok: true as const, returnUrl: safe };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  if (refreshToken) {
    try {
      await fetch(`${directusUrl}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken, mode: "json" }),
      });
    } catch {
      /* ignore */
    }
  }
  await clearAuthCookies();
  redirect("/admin/login");
}
