FROM cypress/base:16.13.0

RUN mkdir /client
WORKDIR /client

COPY package-lock.json package.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "e2e:serve"]
