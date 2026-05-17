# Node.js 22 LTS (nodejs.org) + pnpm 11 (pnpm.io, requires Node ≥22.13)
FROM node:22-alpine AS base

RUN apk add --no-cache libc6-compat libatomic \
  && corepack enable \
  && corepack prepare pnpm@11.1.2 --activate

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
ARG DIRECTUS_TOKEN
ARG NEXT_PUBLIC_DIRECTUS_URL
ENV DIRECTUS_TOKEN=$DIRECTUS_TOKEN
ENV NEXT_PUBLIC_DIRECTUS_URL=$NEXT_PUBLIC_DIRECTUS_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS runner
WORKDIR /app
ARG DIRECTUS_TOKEN
ARG NEXT_PUBLIC_DIRECTUS_URL
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV DIRECTUS_TOKEN=$DIRECTUS_TOKEN
ENV NEXT_PUBLIC_DIRECTUS_URL=$NEXT_PUBLIC_DIRECTUS_URL

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
