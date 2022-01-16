FROM node:16.13.2-buster-slim as base

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN yarn

# TODO add proper use to lock down the image and install some debugging tools

# Production build
FROM base as production
ENV NODE_PATH=./build
RUN yarn start