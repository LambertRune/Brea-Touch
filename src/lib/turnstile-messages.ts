import { getServerLocale } from "@/lib/i18n/server";
import { getMessages } from "@/lib/i18n/get-messages";

export async function getTurnstileMessages() {
  return getMessages(await getServerLocale()).turnstile;
}
