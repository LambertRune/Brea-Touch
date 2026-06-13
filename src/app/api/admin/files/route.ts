import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { readFiles } from "@directus/sdk";
import { COOKIE_CONFIG } from "@/lib/constants";
import { directusUrl } from "@/lib/directus-url";
import { getServerDirectus } from "@/lib/directus";

async function getUploadToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(COOKIE_CONFIG.ACCESS_TOKEN)?.value;
  return sessionToken || process.env.DIRECTUS_TOKEN || null;
}

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "50", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  try {
    const directus = getServerDirectus();
    const files = await directus.request(
      readFiles({
        fields: ["id", "title", "type", "width", "height"],
        sort: ["-uploaded_on"],
        limit,
        offset,
        filter: { type: { _starts_with: "image/" } },
      }),
    );
    const list = Array.isArray(files) ? files : [];
    return NextResponse.json(list);
  } catch (error) {
    console.error("[files GET]", error);
    return NextResponse.json({ error: "Error fetching files" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = await getUploadToken();
  if (!token) {
    return NextResponse.json(
      { error: "Geen upload-token. Log opnieuw in of zet DIRECTUS_TOKEN." },
      { status: 500 },
    );
  }

  try {
    const incoming = await req.formData();
    const file = incoming.get("file");
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Geen bestand gekozen" }, { status: 400 });
    }

    const uploadForm = new FormData();
    uploadForm.append("file", file);

    const uploadRes = await fetch(`${directusUrl}/files`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: uploadForm,
    });

    const bodyText = await uploadRes.text();
    let body: { data?: { id: string }; errors?: { message?: string }[] };
    try {
      body = bodyText ? JSON.parse(bodyText) : {};
    } catch {
      body = {};
    }

    if (!uploadRes.ok) {
      const message =
        body.errors?.[0]?.message ||
        (uploadRes.status === 403
          ? "Geen rechten om bestanden te uploaden in Directus."
          : "Upload mislukt");
      console.error("[files POST]", uploadRes.status, bodyText);
      return NextResponse.json({ error: message }, { status: uploadRes.status });
    }

    if (!body.data?.id) {
      return NextResponse.json({ error: "Onverwacht antwoord van Directus" }, { status: 502 });
    }

    return NextResponse.json({ id: body.data.id });
  } catch (error) {
    console.error("[files POST]", error);
    return NextResponse.json({ error: "Upload mislukt" }, { status: 500 });
  }
}
