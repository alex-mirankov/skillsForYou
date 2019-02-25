FROM node:10.11-alpine
RUN mkdir -p /usr/src/skills4u-client
WORKDIR /usr/src/skills4u-client

COPY package.json /usr/src/skills4u-client
# COPY package-lock.json /usr/src/skills4u-client

RUN npm install
COPY . /usr/src/skills4u-client
CMD  ["npm", "start"]
