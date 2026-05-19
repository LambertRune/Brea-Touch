# BréaTouch — Agent Guide

Instructions for AI agents and developers working in this repo. Pair with **`design.md`** for visual rules.

---

## Stack (pinned)

| Package | Version |
|---------|---------|
| Next.js | **16.2.6** |
| React | 19.2.4 |
| TypeScript | 5.x |
| GSAP + `@gsap/react` | 3.15 / 2.1 |
| lucide-react | ^1.16 |
| react-qr-code | ^2.0.21 |
| resend | ^4 (email) |

Package manager in repo: **npm** (`package-lock.json`); `pnpm-lock.yaml` may exist — prefer npm unless team says otherwise.

Build: `npm run build` (output: **standalone** in `next.config.ts`). Dev: `npm run dev`.

---

## Next.js 16 — mandatory

**This is not classic Next.js from training data.** Before changing routing, middleware, data fetching, or config:

1. Read guides under `node_modules/next/dist/docs/`
2. Follow deprecation notices in installed version
3. Do not assume Pages Router or old `middleware.ts` naming without checking docs

Current edge routing file: **`src/proxy.ts`** exporting `proxy()` (not `middleware`). Redirect: `/contact/sponsoring` → `/sponsoring-contact` (308).

---

## Repository layout

```
src/
  app/
    layout.tsx          # Root: fonts, Header, main, Footer, ScrollToTop
    globals.css         # Design tokens + global components
    fonts.ts            # next/font variables
    page.tsx            # Home
    actions/sendEmail.ts
    contact/            # General contact
    doe-mee/
    missie-visie/
    sponsoring-contact/ # Fiche + SponsoringForm + SupporterGoFundMe
    # favicon: public/pictures/favicon.webp (geen PWA)
  components/
    Header.tsx          # client — nav
    Footer.tsx
    ScrollToTop.tsx     # client — route scroll
    HeroAnimatedTitles.tsx
  proxy.ts              # redirects
public/pictures/        # static assets
design.md               # design system
agent.md                # this file
AGENTS.md               # pointer for Cursor (@agent.md)
```

**No** `src/app/team/` — removed intentionally.

---

## Routing & navigation

| Path | Notes |
|------|--------|
| `/` | Home |
| `/missie-visie` | Mission, vision, SDGs |
| `/doe-mee` | Participate; GoFundMe link |
| `/sponsoring-contact` | Label: **Sponsorovereenkomst** (nav/footer) |
| `/contact` | General contact only |
| `/privacy-policy`, `/cookies`, `/disclaimer` | Linked in footer — implement if missing |

Nav source: `Header.tsx` `navItems` — keep in sync with `Footer.tsx`.

---

## Social media (canonical URLs)

**Always edit URLs in one place:** `src/lib/socialLinks.ts` (`SOCIAL_LINKS`, `SOCIAL_LINK_LIST`). Then sync any hardcoded copies listed below if not yet migrated to the import.

| Platform | URL | Handle / label shown |
|----------|-----|----------------------|
| Instagram | `https://www.instagram.com/breatouch` | `@breatouch` |
| TikTok | `https://www.tiktok.com/@breatouch?_r=1&_t=ZG-957Tpu0syAq` | `@breatouch` |
| LinkedIn | `https://www.linkedin.com/in/bréatouch-borstkankerpreventie-8797093b9` | BréaTouch |

### Where socials appear on the site

| Location | File | What |
|----------|------|------|
| **Footer — “Volg ons”** | `src/components/Footer.tsx` | Icon links (Instagram, TikTok, LinkedIn). IDs: `footer-instagram`, `footer-tiktok`, `footer-linkedin`. |
| **Header — mobile menu bottom** | `src/components/Header.tsx` + `Header.module.css` | Text links from `SOCIAL_LINK_LIST`; visible only ≤768px inside open burger menu (`.navSocials`). |
| **Contact — info cards** | `src/app/contact/page.tsx` | Instagram, TikTok, LinkedIn cards in `#contact-info` (plus e-mail card). |
| **Doe mee — “Vertel het verder”** | `src/app/doe-mee/page.tsx` | `.socialShare` chips: Instagram, TikTok, LinkedIn (`.socialBtn`). |

### Where socials do **not** appear

- Home (`page.tsx`) — no social block in page body (footer only).
- Missie & visie — footer only.
- Sponsoring-contact — tier copy mentions LinkedIn/instagram as **sponsor benefits**, not clickable profile links (unless contact strip is re-added).

### E-mail (not social)

- `breatouch@outlook.com` — footer Contact column, contact info card, form error fallback.

---

## Styling rules

1. **Global primitives** → `globals.css` (buttons, badges, cards, containers, sections).
2. **Page-specific** → `page.module.css` beside the route.
3. **Component-specific** → `Component.module.css` in `src/components/`.
4. Use **CSS variables** from `:root`; see `design.md` for hex and tier rules.

### Buttons (enforced)

- `.btn--primary:hover`: box-shadow glow only — **no** `translateY`
- Other variants: color/border/background only — **no** lift
- External CTAs: `<a href="..." target="_blank" rel="noopener noreferrer">`

### Client components

Mark `"use client"` when using: `useState`, `useEffect`, `useSearchParams`, GSAP, browser APIs.

Wrap `useSearchParams()` consumers in `<Suspense>` (see `sponsoring-contact/page.tsx`).

---

## Business logic agents must respect

### GoFundMe

Single campaign URL everywhere:

```
https://gofund.me/94dae2071
```

- Constant: `GOFUNDME_URL` in `SupporterGoFundMe.tsx` (export and reuse if adding links)
- Doe-mee: plain `<a>`, not `Link`
- QR encodes same URL (`react-qr-code`)

### Sponsoring tiers

| Tier | On fiche | In form `<select>` |
|------|----------|-------------------|
| Supporter | Yes (GoFundMe + QR) | **No** |
| Brons | Yes | Yes |
| Zilver | Yes | Yes |
| Goud | Yes | Yes |

Form tier options: `SponsoringForm.tsx` → `TIER_OPTIONS = ["Brons", "Zilver", "Goud"]`.

Optional prefill: `?tier=Brons` (etc.) via `useSearchParams` — must match `TIER_OPTIONS`.

Email subject line from form: `subject: "sponsoring"` in `sendEmailAction` call.

### Contact email

- Server action: `src/app/actions/sendEmail.ts`
- Requires `RESEND_API_KEY` in environment
- Contact + sponsoring forms: Cloudflare Turnstile (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`) — server verify in `sendEmailAction`
- From address currently `onboarding@resend.dev` — change for production domain verification
- To: `breatouch@outlook.com`

Never commit `.env` or API keys.

---

## Forms pattern

Both contact and sponsoring forms:

1. Client state: `idle | sending | sent | error`
2. Submit → `sendEmailAction({ name, email, subject, message })`
3. Sponsoring form composes `company` + `tier` into message body before send

Copy is **Dutch**. Keep formal-friendly tone (“u/je” as already used on site).

---

## Images

`next/image` with paths under `/public/...`. Logo uses `unoptimized` in header (SVG). Configure in `next.config.ts` if adding remote domains.

---

## Animation

- **GSAP**: only where already used (`HeroAnimatedTitles`). Use `@gsap/react` `useGSAP` + cleanup via context; register plugins once.
- **Route scroll**: do not remove `ScrollToTop` without replacement; users expect top-of-page on navigation.
- Avoid new infinite motion without reduced-motion guard.

---

## Content & SEO

- Default metadata in `app/layout.tsx`; per-page `export const metadata` where present.
- Title template: `%s | BréaTouch`
- Brand spelling: **BréaTouch** (not BreaTouch in user-facing copy)

---

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before PR
npm run lint
```

Docker: `Dockerfile` present for standalone deploy.

---

## Change checklist

Before finishing a UI task:

- [ ] Matches `design.md` tokens and button hover rules
- [ ] No Supporter in sponsor form dropdown
- [ ] External fundraising links use `<a>` + correct GoFundMe URL
- [ ] Nav/footer labels consistent (“Sponsorovereenkomst”)
- [ ] `npm run build` succeeds
- [ ] No secrets in diff

---

## What not to do

- Re-add `/team` without explicit request
- Merge sponsoring into `/contact` as nested route (use `/sponsoring-contact`)
- Add Tailwind/shadcn component library without project decision (QR tool inspired `react-qr-code` only)
- Use training-data Next.js APIs without reading `node_modules/next/dist/docs/`
- Drive-by refactors on unrelated pages
- Create git commits unless user asks

---

## Related files

| File | Role |
|------|------|
| `design.md` | Colors, type, components, tiers, motion |
| `AGENTS.md` | Cursor rule entry → `@agent.md` |
| `CLAUDE.md` | Claude entry → `@AGENTS.md` |
