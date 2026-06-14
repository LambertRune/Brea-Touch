import type { Locale } from "./types";

export const BROCHURE_BY_LOCALE: Record<
  Locale,
  { href: string; filename: string }
> = {
  nl: {
    href: "/brochures/Nederlandse%20Brochure%20Br%C3%A9aTouch.pdf",
    filename: "Nederlandse Brochure BréaTouch.pdf",
  },
  en: {
    href: "/brochures/Engelse%20Brochure%20Br%C3%A9aTouch.pdf",
    filename: "Engelse Brochure BréaTouch.pdf",
  },
  fr: {
    href: "/brochures/Franse%20Brochure%20Br%C3%A9aTouch.pdf",
    filename: "Franse Brochure BréaTouch.pdf",
  },
};
