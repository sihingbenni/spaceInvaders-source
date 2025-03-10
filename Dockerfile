FROM node:lts-alpine

# install curl
RUN apk add --no-cache curl

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app/

RUN npm install

# Bundle app source
COPY . /usr/src/app

CMD [ "npm", "start" ]
