FROM node:16-alpine AS alpine

LABEL version="1.0"
LABEL description="Dockerfile for the backend of the application."

# shell scripts
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .

EXPOSE 5500

CMD [ "npm", "run", "server" ]
