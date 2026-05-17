import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/contact/sponsoring") {
    const url = request.nextUrl.clone();
    url.pathname = "/sponsoring-contact";
    return NextResponse.redirect(url, 308);
  }
}

export const config = {
  matcher: ["/contact/sponsoring"],
};
