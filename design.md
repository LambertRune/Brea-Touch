# BréaTouch — Design System

Concrete reference for UI work on this site. Source of truth for tokens: `src/app/globals.css`. Page-specific rules live in `*.module.css` next to each route.

---

## Brand

| Item | Value |
|------|--------|
| Name | BréaTouch (accent on **é**) |
| Tagline | Make the touch matter |
| Language | Dutch (`nl`), locale `nl_BE` in metadata |
| Tone | Warm, accessible, educational — borstkanker awareness & zelfonderzoek |
| Product (future) | Educatieve douchespons met geïntegreerde knobbel |

**Do not** use clinical cold palettes or fear-based imagery without context. Prefer cream/warm backgrounds and soft brand gradients.

---

## Color tokens

Defined in `:root` (`globals.css`). Use CSS variables — never hardcode brand hex in new components unless matching an existing page pattern (e.g. tier cards).

### Brand palette

| Token | Hex | Use |
|-------|-----|-----|
| `--color-yellow` | `#ddd464` | Badges, accents, tier Supporter family |
| `--color-charcoal` | `#494949` | Headings, body emphasis, QR border |
| `--color-cream` | `#e7e4df` | Borders |
| `--color-brown` | `#b08471` | Links, primary gradient start |
| `--color-sage` | `#a3b0ad` | Badge sage |
| `--color-rose` | `#d8ad9b` | Badges, gradients, borders |
| `--color-olive` | `#b2a952` | Badge / secondary olive (lighter than accent olive) |
| `--color-dark-brown` | `#715b52` | Link hover |

### Semantic

| Token | Hex / value |
|-------|-------------|
| `--color-bg` | `#ffffff` |
| `--color-bg-alt` | `#faf9f7` — `section--alt` |
| `--color-bg-warm` | `#f5f2ee` — header background, warm sections |
| `--color-text` | `#494949` |
| `--color-text-light` | `#7a7a7a` |
| `--color-text-muted` | `#a0a0a0` |
| `--color-border` | `#e7e4df` |
| `--color-border-light` | `#f0ede8` |

### Signature gradient

```css
linear-gradient(135deg, var(--color-brown), var(--color-rose));
```

Used on: `.btn--primary`, `.stat-card__number`, `.divider`, CTA sections on home.

### Border accent tokens (`:root`)

Shared 2px border colors for **home verhalen**, **`/contact` info cards**, and **sponsor honeycomb** (`SponsorHoneycomb`). Prefer these variables — do not reintroduce the old blue accent (`#7ba3c9`).

| Token | Hex | Typical use |
|-------|-----|-------------|
| `--border-accent-green` | `#99ada8` | Verhaal 1, contact e-mail, honeycomb cycle |
| `--border-accent-olive` | `#b2a83d` | Verhaal 2, contact Instagram (goud/olijf — not blue) |
| `--border-accent-rose` | `#d8ad9b` | Verhaal 3, contact TikTok |
| `--border-accent-brown` | `#b08471` | Contact LinkedIn, honeycomb 4th in cycle |

**Contact mapping** (`contact/page.module.css`): e-mail → green, Instagram → olive, TikTok → rose, LinkedIn → brown.

**Honeycomb** (`SponsorHoneycomb.module.css`, `honeycomb-layout.ts`): borders cycle green → olive → rose → brown; white interior; sponsor name always visible, centered in the hex (dynamic `font-size` on small cells for long names).

**Honeycomb geometry** (`honeycomb-layout.ts`, pointy-top):
- `SMALL_HEX_EDGE` = 48px; `LARGE_HEX_EDGE` = 2×
- Centerafstand gelijk: `r·√3` (+ gap); gemengd groot+klein: `R+r` (+ gap)
- **Algoritme:** grote hexen eerst (random groei in 6 richtingen), daarna kleine op alle 6 zijden van elke grote + in zakken tussen twee grote
- Seeded via sponsor-ids; overlap- en verbindingscheck op pixelcentra

### Other fixed accents

| Context | Notes |
|---------|--------|
| Doe-mee option card borders | Align with accent greens/olive/rose in `doe-mee/page.module.css` |
| Sponsor taglines (legacy CSS) | `#c9a227`, `#5a8fb8`, `#d88fa0` — unused on current pages |

---

## Typography

Loaded in `src/app/fonts.ts`, applied via `layout.tsx` on `<html>`.

| Role | Font | CSS variable | Weights |
|------|------|----------------|---------|
| Body | Plus Jakarta Sans | `--font-body` | 300–700 |
| Headings (h1–h6) | Nunito | `--font-heading` | 400–900 (display uses 800) |
| Hero display | League Gothic | `--font-hero-title` | 400 |

### Scale (global)

| Element | Size |
|---------|------|
| `body` | `16px`, `line-height: 1.7` |
| `h1` | `clamp(2.5rem, 5vw, 4rem)` |
| `h2` | `clamp(2rem, 4vw, 3rem)` |
| `h3` | `clamp(1.5rem, 3vw, 2rem)` |
| `h4` | `clamp(1.25rem, 2.5vw, 1.5rem)` |

Headings: `font-weight: 800`, `letter-spacing: -0.02em`, color `--color-charcoal`.

Sponsor page hero (`page.module.css`): uppercase, `clamp(2.3rem, 8vw, 5rem)`, League Gothic via `.heroTitle` if class applied.

---

## Spacing & layout

### Spacing scale

`--space-xs` (0.25rem) through `--space-5xl` (8rem). Standard section vertical padding: `--space-5xl` desktop, `--space-3xl` ≤768px.

### Containers

| Class | Max width |
|-------|-----------|
| `.container` | `1200px` |
| `.container--narrow` | `800px` |
| `.container--wide` | `1400px` |

Horizontal padding: `--space-xl` (desktop), `--space-lg` (≤768px), `--space-md` (≤480px).

### Sections

| Class | Background |
|-------|------------|
| `.section` | default white |
| `.section--alt` | `--color-bg-alt` |
| `.section--warm` | `--color-bg-warm` |

### Header offset

Fixed header; `<main>` has `paddingTop: 72px` in `layout.tsx`. Anchor targets use `:target { scroll-margin-top: 72px; }`.

### Grids

`.grid`, `.grid--2`, `.grid--3`, `.grid--4` in `globals.css` — collapse to 1 column at 768px; 4-col becomes 2-col at 1024px.

---

## Radius & elevation

| Token | Value |
|-------|--------|
| `--radius-sm` | `8px` |
| `--radius-md` | `12px` |
| `--radius-lg` | `20px` |
| `--radius-xl` | `28px` |
| `--radius-full` | pill |

Shadows: `--shadow-sm` … `--shadow-xl` (charcoal-tinted, low opacity).

---

## Components (global classes)

### Buttons (`.btn`)

| Variant | Default | Hover |
|---------|---------|--------|
| `btn--primary` | Brown→rose gradient, shadow `0 4px 16px rgba(176,132,113,0.3)` | **Only** stronger shadow `0 8px 24px …` — **no** `translateY` |
| `btn--secondary` | White bg, border | Border/text → brown |
| `btn--outline` | Transparent, brown border | Filled brown, white text |
| `btn--yellow` | Yellow bg | `filter: brightness(1.05)` |
| `btn--lg` / `btn--sm` | Size modifiers | — |

**Rule:** No floating/lift hover on any button. Primary keeps glow transition on `box-shadow` only (`transition: box-shadow` on primary).

External URLs: use native `<a>`, not `next/link`.

### Badges

`.badge` + `.badge--rose` | `.badge--yellow` | `.badge--sage` — uppercase, pill, small type.

### Cards

`.card` — white, `--radius-lg`, light border, `--shadow-sm`, padding `--space-2xl`.

### Stat cards

`.stat-card`, `.stat-card__number` (gradient text), `.stat-card__label`.

### Divider

`.divider` / `.divider--center` — 60×4px gradient bar.

---

## Sponsoring fiche (tier cards)

File: `src/app/sponsoring-contact/page.module.css` + `page.tsx`.

### Grid

- Desktop: 4 equal columns, `minmax(0, 1fr)`, gap `clamp(md, 2vw, xl)`.
- Card: `border-radius: 32px`, `min-height: 520px`, flex column, centered text.
- Icon circle: 78px, `-56px` top margin (overlaps top edge), 8px white border ring.

### Tier colors (background / title / icon)

| Tier | Background | Accent |
|------|------------|--------|
| Supporter | `#f7f6ea` | `#9c9b34` |
| Brons | `#f4efea` | `#8b6c5a` |
| Zilver | `#fbf0f1` | `#dfa7ad` |
| GOUD | `#eef9fd` | `#9ed4ec` (title class `.tierTitleGoud` → lowercase “goud”) |

Icons: Lucide in `SponsoringFicheVisuals.tsx` — Heart, Clover, 2× Diamond, Gem (white on colored circle).

### Supporter block only

`SupporterGoFundMe.tsx`:

1. Full-width `btn btn--primary` → GoFundMe
2. Divider: line — **of** — line (`.orDivider`)
3. QR via `react-qr-code`, URL constant `GOFUNDME_URL = https://gofund.me/94dae2071`

**Supporter is not** in sponsor form dropdown (only Brons, Zilver, Goud).

---

## Page patterns

### Standard inner page

1. `.pageHeader` — gradient wash, centered badge + `h1` + lead
2. `.section` content in `.container`
3. Optional `.section--alt` for forms / secondary blocks

### Home (`page.tsx`)

Hero with `HeroAnimatedTitles` (GSAP), steps, testimonials (3 colored borders), CTA, partners. Styles: `page.module.css`.

### Missie & visie

SDG section: horizontal scroll on small screens; card grid on desktop. Images in `public/pictures/SDG*.png`.

### Doe mee

Three option cards (gift / share / sponsor). GoFundMe: `<a href="https://gofund.me/94dae2071">`. Social chips: `.socialBtn` — hover changes bg only, no lift.

Sponsor honeycomb in dashed `.sponsorsPlaceholder` when CMS sponsors exist (`SponsorHoneycomb` with `embedded`). Small hexes: 48px edge; names centered and scaled to stay readable.

### Contact vs sponsoring

| Route | Purpose |
|-------|---------|
| `/contact` | General contact form; left info cards use `--border-accent-*` (same palette as home verhalen) |
| `/sponsoring-contact` | Tier fiche + sponsor form |
| `/contact/sponsoring` | 308 redirect → `/sponsoring-contact` (`src/proxy.ts`) |

Removed route: `/team` — do not reintroduce without product ask.

---

## Motion & scroll

| Mechanism | Location | Behavior |
|-----------|----------|----------|
| `scroll-behavior: smooth` | `html` (if reduced-motion off) | In-page anchors |
| `ScrollToTop` | `components/ScrollToTop.tsx` | On route change: smooth scroll then snap `y=0` |
| GSAP | `HeroAnimatedTitles.tsx` | Hero title rotation only |
| CSS keyframes | `globals.css` | `fadeInUp`, `fadeIn`, etc. — utility classes `.animate-*` |

Respect `prefers-reduced-motion`: do not add motion-only information.

---

## Imagery & assets

| Path | Use |
|------|-----|
| `/pictures/LOGO.svg` | Header logo (`unoptimized` on Image) |
| `/pictures/IMG_4693.webp` | Content photos |
| `/pictures/Coming-soon.jpg` | Placeholder |
| `/pictures/SDG3.png`, `SDG4.png`, `SDG5.png`, `SDG10.png` | Missie & visie |
| `public/pictures/favicon.webp` | Favicon (geen PWA / geen manifest) |

Prefer WebP for photos. Keep alt text in Dutch, descriptive.

---

## Forms (visual)

Shared patterns in `contact/page.module.css` and `sponsoring-contact/page.module.css`:

- `.label`, `.input`, `.textarea`
- Focus: border + `box-shadow: 0 0 0 3px rgba(176, 132, 113, 0.15)`
- Submit: full-width `btn btn--primary btn--lg` on sponsor form
- Success/error blocks with icon or message — reuse existing classes

---

## Responsive breakpoints

| Breakpoint | Typical change |
|------------|----------------|
| `1024px` | Grids 4→2 cols |
| `768px` | Single column grids, smaller sections, smaller h1/h2 |
| `480px` | Tighter container padding, smaller `btn--lg` |

Sponsor tier grid: check `page.module.css` bottom — likely 2-col then scroll/stack on mobile.

---

## Accessibility checklist

- `lang="nl"` on `<html>`
- Nav: `aria-label` on logo, burger `aria-expanded`
- External links: `rel="noopener noreferrer"`
- QR: `aria-label` on SVG in `SupporterGoFundMe`
- Sufficient contrast on tier pastels — body text stays `--color-text` on lists

---

## Anti-patterns

- Do not add `translateY` hover on `.btn` or social buttons.
- Do not put Supporter in sponsor form tier `<select>`.
- Do not use `Link` for `gofund.me` or other external origins.
- Do not introduce Tailwind unless project migrates — CSS Modules + globals only today.
- Do not duplicate tier hex in random pages — extend `page.module.css` tier classes.
