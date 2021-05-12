FROM node:12.22-alpine

RUN mkdir /opt/server
WORKDIR /opt/server

COPY package.json ./
COPY package-lock.json ./

RUN npm install