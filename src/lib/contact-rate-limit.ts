import { headers } from "next/headers";
import fs from "fs/promises";
import path from "path";

const MAX_SUBMISSIONS_PER_DAY = 3;
const TIMEZONE = "Europe/Brussels";
const STORE_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(STORE_DIR, "contact-rate-limit.json");

type RateLimitEntry = { count: number; date: string };
type RateLimitStore = Record<string, RateLimitEntry>;

let writeQueue: Promise<void> = Promise.resolve();

function getTodayBrussels(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE }).format(
    new Date(),
  );
}

function getClientIp(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = headerList.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

async function withLock<T>(fn: () => Promise<T>): Promise<T> {
  let release!: () => void;
  const lock = new Promise<void>((resolve) => {
    release = resolve;
  });
  const previous = writeQueue;
  writeQueue = writeQueue.then(() => lock);
  await previous;
  try {
    return await fn();
  } finally {
    release();
  }
}

async function readStore(): Promise<RateLimitStore> {
  try {
    const raw = await fs.readFile(STORE_FILE, "utf8");
    return JSON.parse(raw) as RateLimitStore;
  } catch {
    return {};
  }
}

function pruneStore(store: RateLimitStore, today: string): RateLimitStore {
  const pruned: RateLimitStore = {};
  for (const [ip, entry] of Object.entries(store)) {
    if (entry.date === today) pruned[ip] = entry;
  }
  return pruned;
}

async function writeStore(store: RateLimitStore): Promise<void> {
  await fs.mkdir(STORE_DIR, { recursive: true });
  await fs.writeFile(STORE_FILE, JSON.stringify(store), "utf8");
}

export const CONTACT_RATE_LIMIT_MESSAGE =
  "Je hebt het maximum van 3 berichten per dag bereikt. Probeer het morgen opnieuw of mail naar breatouch@outlook.com.";

/** Atomisch: check + verbruik 1 slot (max 3 per IP per kalenderdag, Europe/Brussels). */
export async function tryConsumeContactSubmissionSlot(): Promise<
  { ok: true } | { ok: false; message: string }
> {
  return withLock(async () => {
    const headerList = await headers();
    const ip = getClientIp(headerList);
    const today = getTodayBrussels();
    const store = pruneStore(await readStore(), today);
    const entry = store[ip];
    const count = entry?.date === today ? entry.count : 0;

    if (count >= MAX_SUBMISSIONS_PER_DAY) {
      return { ok: false, message: CONTACT_RATE_LIMIT_MESSAGE };
    }

    store[ip] = { date: today, count: count + 1 };
    await writeStore(store);
    return { ok: true };
  });
}
