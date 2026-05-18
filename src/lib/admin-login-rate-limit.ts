import { headers } from "next/headers";
import fs from "fs/promises";
import path from "path";

const MAX_FAILED_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const STORE_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(STORE_DIR, "admin-login-rate-limit.json");

type Entry = { count: number; windowStart: number };
type Store = Record<string, Entry>;

let writeQueue: Promise<void> = Promise.resolve();

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

async function readStore(): Promise<Store> {
  try {
    const raw = await fs.readFile(STORE_FILE, "utf8");
    return JSON.parse(raw) as Store;
  } catch {
    return {};
  }
}

async function writeStore(store: Store): Promise<void> {
  await fs.mkdir(STORE_DIR, { recursive: true });
  await fs.writeFile(STORE_FILE, JSON.stringify(store), "utf8");
}

function pruneStore(store: Store, now: number): Store {
  const pruned: Store = {};
  for (const [ip, entry] of Object.entries(store)) {
    if (now - entry.windowStart < WINDOW_MS) pruned[ip] = entry;
  }
  return pruned;
}

export const ADMIN_LOGIN_RATE_LIMIT_MESSAGE =
  "Te veel mislukte inlogpogingen. Wacht 15 minuten en probeer het opnieuw.";

export async function assertAdminLoginAllowed(): Promise<
  { ok: true } | { ok: false; message: string }
> {
  return withLock(async () => {
    const now = Date.now();
    const headerList = await headers();
    const ip = getClientIp(headerList);
    const store = pruneStore(await readStore(), now);
    const entry = store[ip];

    if (entry && entry.count >= MAX_FAILED_ATTEMPTS) {
      return { ok: false, message: ADMIN_LOGIN_RATE_LIMIT_MESSAGE };
    }

    return { ok: true };
  });
}

export async function recordAdminLoginFailure(): Promise<void> {
  return withLock(async () => {
    const now = Date.now();
    const headerList = await headers();
    const ip = getClientIp(headerList);
    const store = pruneStore(await readStore(), now);
    const entry = store[ip];

    if (!entry || now - entry.windowStart >= WINDOW_MS) {
      store[ip] = { count: 1, windowStart: now };
    } else {
      entry.count += 1;
    }

    await writeStore(store);
  });
}

export async function clearAdminLoginFailures(): Promise<void> {
  return withLock(async () => {
    const now = Date.now();
    const headerList = await headers();
    const ip = getClientIp(headerList);
    const store = pruneStore(await readStore(), now);
    delete store[ip];
    await writeStore(store);
  });
}
