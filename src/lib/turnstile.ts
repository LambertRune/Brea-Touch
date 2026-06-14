import { headers } from "next/headers";
import { getTurnstileMessages } from "@/lib/turnstile-messages";

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type SiteverifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

function getClientIp(headerList: Headers): string | undefined {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = headerList.get("x-real-ip")?.trim();
  return realIp || undefined;
}

export async function verifyTurnstileToken(
  token: string | undefined,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const t = await getTurnstileMessages();
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return {
      ok: false,
      message:
        process.env.NODE_ENV === "development"
          ? t.secretMissingDev
          : t.formUnavailable,
    };
  }

  if (!token?.trim()) {
    return { ok: false, message: t.missing };
  }

  const headerList = await headers();
  const remoteip = getClientIp(headerList);

  const body = new URLSearchParams({
    secret,
    response: token.trim(),
  });
  if (remoteip) body.set("remoteip", remoteip);

  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Turnstile siteverify HTTP error:", res.status);
      return { ok: false, message: t.failed };
    }

    const data = (await res.json()) as SiteverifyResponse;
    if (!data.success) {
      console.error("Turnstile siteverify failed:", data["error-codes"]);
      return { ok: false, message: t.failed };
    }

    return { ok: true };
  } catch (err) {
    console.error("Turnstile siteverify request failed:", err);
    return { ok: false, message: t.failed };
  }
}
