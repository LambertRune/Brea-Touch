import type { NextResponse } from "next/server";

function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

function directusOrigin(): string {
  const url = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  if (!url) return "https://dbbreatouch.phiosk.be";
  try {
    return new URL(url).origin;
  } catch {
    return "https://dbbreatouch.phiosk.be";
  }
}

/** CSP: strict in productie; in dev o.a. unsafe-eval + websockets voor Next/React HMR. */
export function buildContentSecurityPolicy(): string {
  const dev = isDevelopment();
  const directus = directusOrigin();
  const turnstile = "https://challenges.cloudflare.com";

  const scriptSrc = dev
    ? `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${turnstile}`
    : `script-src 'self' 'unsafe-inline' ${turnstile}`;

  const connectSrc = dev
    ? `connect-src 'self' ${directus} ${turnstile} ws: wss: http://localhost:* https://localhost:*`
    : `connect-src 'self' ${directus} ${turnstile}`;

  const parts = [
    "default-src 'self'",
    `img-src 'self' ${directus} data: blob:`,
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    connectSrc,
    `frame-src 'self' ${turnstile}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ];

  if (!dev) {
    parts.push("upgrade-insecure-requests");
  }

  return parts.join("; ");
}

export function getSecurityHeaderEntries(): ReadonlyArray<{
  key: string;
  value: string;
}> {
  return [
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=()",
    },
    ...(isDevelopment()
      ? []
      : [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ]),
    { key: "X-DNS-Prefetch-Control", value: "on" },
    { key: "Content-Security-Policy", value: buildContentSecurityPolicy() },
  ];
}

export function applySecurityHeaders(response: NextResponse): NextResponse {
  for (const { key, value } of getSecurityHeaderEntries()) {
    response.headers.set(key, value);
  }
  response.headers.delete("x-powered-by");
  return response;
}
