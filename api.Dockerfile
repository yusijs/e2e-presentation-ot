FROM node:16-alpine

RUN mkdir /client
WORKDIR /client

COPY package-lock.json package.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "serve:api"]
