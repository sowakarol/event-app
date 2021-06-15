FROM node:14 AS test

ENV NODE_ENV TEST

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "mocha:integration" ]


FROM node:14 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start:dev" ]
