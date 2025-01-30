# Base image
FROM node:lts-alpine AS base
# https://github.com/nodejs/docker-node?tab=readme-ov-file#nodealpine
RUN apk add --no-cache gcompat
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN apk add --no-cache python3 make g++
RUN corepack enable pnpm
RUN pnpm i --frozen-lockfile 

# Rebuild the source code only when needed
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm
RUN pnpm build 
RUN pnpm prune --prod --no-optional

# Production image, copy all the files and run next
FROM base AS runner
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# standalone mode (https://nextjs.org/docs/pages/api-reference/next-config-js/output)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# regular mode (next start)
# COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
