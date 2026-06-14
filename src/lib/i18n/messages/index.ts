import type { Locale } from "../types";
import type { Messages } from "./types";
import { en } from "./en";
import { fr } from "./fr";
import { nl } from "./nl";

export type { Messages };

export const messages: Record<Locale, Messages> = {
  nl,
  en,
  fr,
};
