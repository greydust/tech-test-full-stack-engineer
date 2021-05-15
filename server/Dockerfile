FROM node:12.22-alpine

RUN mkdir -p /opt/server
WORKDIR /opt/server

COPY package.json ./
COPY package-lock.json ./

RUN npm install