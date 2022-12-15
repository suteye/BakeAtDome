FROM node:16 as builder

LABEL version="1.0"
LABEL description="Dockerfile for the frontend of the application."

# shell scripts
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .

RUN npm run build

# nginx

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
