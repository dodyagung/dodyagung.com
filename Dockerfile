FROM node:lts-alpine AS builder
ENV NEXT_TELEMETRY_DISABLED=1 \
    TZ=Asia/Jakarta
RUN apk add --no-cache gcompat tzdata && \
    ln -s /usr/share/zoneinfo/$TZ /etc/localtime && \
    npm install --global corepack@latest && \
    corepack enable pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
