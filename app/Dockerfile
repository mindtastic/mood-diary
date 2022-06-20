FROM node:alpine

WORKDIR /app

COPY package.json ./
RUN yarn

COPY . .

EXPOSE 80
CMD ["yarn", "run", "start"]