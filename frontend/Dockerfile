# Сборка frontend
FROM node:18-alpine AS build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build

# Запуск в nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Копируем свой конфиг nginx (если нужно) или оставляем дефолтный

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
