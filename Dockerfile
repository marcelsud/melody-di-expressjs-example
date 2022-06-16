FROM node:lts-alpine

RUN apk add --no-cache sqlite

COPY . /app
WORKDIR /app

RUN rm -rf /app/node_modules
RUN npm run setup

CMD [ "npm", "run", "start" ]