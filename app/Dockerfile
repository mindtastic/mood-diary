FROM node:alpine

WORKDIR /app

COPY . .

RUN yarn

EXPOSE 80
CMD ["node", "server.js"]