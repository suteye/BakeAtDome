FROM node:16

# app
WORKDIR /app
COPY . .
RUN npm install

# frontend
WORKDIR /app/frontend
RUN npm i -f

# backend
WORKDIR /app/backend
RUN npm i -f

#  shell scripts
WORKDIR /app
ADD start.sh /app
RUN chmod +x /app/start.sh
CMD [ "./start.sh" ]