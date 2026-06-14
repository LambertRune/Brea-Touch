@agent.md

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- **Package manager is pnpm**, not npm. `Dockerfile` builds with `pnpm install --frozen-lockfile` + `pnpm build`, and `package.json` pins `packageManager: pnpm`. Ignore the "prefer npm" note in `agent.md` for install/build — use `pnpm install` / `pnpm dev` / `pnpm build` / `pnpm lint`.
- **Run dev**: `pnpm dev` (Next.js + Turbopack), defaults to port `3000`. Override with `PORT=<n> pnpm dev` when running alongside the other repos in this workspace (they also default to 3000).
- **Contact + sponsoring forms** call a server action (`src/app/actions/sendEmail.ts`) that requires Cloudflare Turnstile + Resend. For local dev, set Turnstile to Cloudflare's always-pass test keys (`NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA`, `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA`) in `.env.local` so the captcha auto-passes. Actual email delivery still needs a real `RESEND_API_KEY`; without it the form submits and fails gracefully at the email step.
- `pnpm lint` currently reports pre-existing errors (e.g. `react-hooks/set-state-in-effect`); this is the repo's state, not an environment problem.
