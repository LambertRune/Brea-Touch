import { NextRequest, NextResponse } from "next/server";
import { isAllowedDirectusAssetUrl } from "@/lib/directus-url";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url || !isAllowedDirectusAssetUrl(url)) {
    return NextResponse.json({ error: "Invalid asset URL" }, { status: 400 });
  }

  try {
    const upstream = await fetch(url, {
      next: { revalidate: 86_400 },
    });
    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Upstream fetch failed" },
        { status: upstream.status },
      );
    }

    const body = await upstream.arrayBuffer();
    const contentType =
      upstream.headers.get("content-type") ?? "application/octet-stream";

    return new NextResponse(body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json({ error: "Proxy failed" }, { status: 502 });
  }
}
