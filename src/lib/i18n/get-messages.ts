import { messages } from "./messages/index";
import type { Messages } from "./messages/index";
import type { Locale } from "./types";

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}

export type { Messages };
