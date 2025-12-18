FROM node:20-alpine

WORKDIR /app

# Kopiujemy pliki package.json i package-lock.json
COPY package*.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy resztę plików
COPY . .

# Wystawiamy port 5173 (standard dla Vite)
EXPOSE 5173

# Uruchamiamy Vite z flagą --host, aby był dostępny poza kontenerem
CMD ["npm", "run", "dev", "--", "--host"]
