# --- STAGE 1: Development (do pracy lokalnej) ---
FROM node:20-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# --- STAGE 2: Builder (budowanie wersji produkcyjnej) ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Budujemy aplikację (powstanie folder /dist)
RUN npm run build

# --- STAGE 3: Production (lekki serwer Nginx) ---
FROM nginx:alpine AS production
# Kopiujemy tylko zbudowane pliki z etapu 'builder'
COPY --from=builder /app/dist /usr/share/nginx/html
# Kopiujemy konfigurację Nginx dla SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]