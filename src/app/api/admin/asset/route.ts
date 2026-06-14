import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { COOKIE_CONFIG } from "@/lib/constants";
import { directusUrl } from "@/lib/directus-url";

const FILE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function getAssetToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(COOKIE_CONFIG.ACCESS_TOKEN)?.value;
  return sessionToken || process.env.DIRECTUS_TOKEN || null;
}

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fileId = req.nextUrl.searchParams.get("id");
  if (!fileId || !FILE_ID.test(fileId)) {
    return NextResponse.json({ error: "Invalid file id" }, { status: 400 });
  }

  const transform = req.nextUrl.searchParams.get("transform");
  const assetUrl = transform
    ? `${directusUrl}/assets/${fileId}?${transform}`
    : `${directusUrl}/assets/${fileId}`;

  const token = await getAssetToken();
  const headers: HeadersInit = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  try {
    const upstream = await fetch(assetUrl, { headers, cache: "no-store" });
    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Asset not found" },
        { status: upstream.status },
      );
    }

    const body = await upstream.arrayBuffer();
    const contentType =
      upstream.headers.get("content-type") ?? "application/octet-stream";

    return new NextResponse(body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, no-store, max-age=0",
      },
    });
  } catch {
    return NextResponse.json({ error: "Proxy failed" }, { status: 502 });
  }
}
