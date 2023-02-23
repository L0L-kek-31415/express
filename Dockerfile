FROM node:19-alpine3.16

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install
RUN npm i -g nodemon

COPY --chown=node:node . .
