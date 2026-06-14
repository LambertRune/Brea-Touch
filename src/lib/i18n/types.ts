export const LOCALES = ["nl", "en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  nl: "Nederlands",
  en: "English",
  fr: "Français",
};

export const DEFAULT_LOCALE: Locale = "nl";
export const LOCALE_COOKIE = "bt_locale";
