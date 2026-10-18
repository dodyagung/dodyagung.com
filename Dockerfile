FROM node:lts-alpine AS builder
ENV NEXT_TELEMETRY_DISABLED=1 \
    TZ=Asia/Jakarta
RUN apk add --no-cache gcompat tzdata && \
    ln -s /usr/share/zoneinfo/$TZ /etc/localtime
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
