# Base image
FROM node:lts-alpine AS base
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1
# https://github.com/nodejs/docker-node?tab=readme-ov-file#nodealpine
RUN apk add --no-cache gcompat
RUN npm install --global corepack@latest && \
    corepack enable pnpm
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm i --frozen-lockfile 

# Rebuild the source code only when needed
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build && \
    pnpm prune --prod

# Production image, copy all the files and run next
FROM base AS runner
# standalone mode (https://nextjs.org/docs/pages/api-reference/next-config-js/output)
COPY --chown=node:node --from=builder /app/.next/standalone ./
COPY --chown=node:node --from=builder /app/.next/static ./.next/static
COPY --chown=node:node --from=builder /app/public ./public
# regular mode (next start)
# COPY --chown=node:node --from=builder /app/public ./public
# COPY --chown=node:node --from=builder /app/package.json ./package.json
# COPY --chown=node:node --from=builder /app/.next ./.next
# COPY --chown=node:node --from=builder /app/node_modules ./node_modules

USER node
EXPOSE 3000
CMD ["node", "server.js"]
