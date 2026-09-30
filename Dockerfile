# Stage 1: Build React/Vite SPA
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_OPENROUTER_API_KEY
ARG VITE_OPENROUTER_DEFAULT_MODEL
ENV VITE_OPENROUTER_API_KEY=$VITE_OPENROUTER_API_KEY
ENV VITE_OPENROUTER_DEFAULT_MODEL=$VITE_OPENROUTER_DEFAULT_MODEL

RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=20s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
