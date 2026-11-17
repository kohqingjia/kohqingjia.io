# OWNER: Claude. Static build served by a tiny Caddy behind the VPS's main Caddy.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy:2-alpine
COPY deploy/Caddyfile.site /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
