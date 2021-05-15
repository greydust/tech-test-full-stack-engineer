FROM node:12.22-alpine

RUN mkdir -p /opt/ui
WORKDIR /opt/ui

COPY package.json ./
COPY package-lock.json ./

RUN npm install