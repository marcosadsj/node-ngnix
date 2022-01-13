FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install

ENTRYPOINT node index.js