import { cookies } from "next/headers";
import { getMessages } from "./get-messages";
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALES, type Locale } from "./types";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return LOCALES.includes(value as Locale) ? (value as Locale) : DEFAULT_LOCALE;
}

export async function getServerMessages() {
  return getMessages(await getServerLocale());
}
