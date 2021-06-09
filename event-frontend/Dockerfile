FROM node:14 AS development

WORKDIR /usr/src/app

COPY ./package*.json /usr/src/app/

RUN npm install
# RUN npm install react-scripts@3.4.1 -g --silent

COPY . .

CMD ["npm", "start"]

FROM node:14 AS production

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "build"]
