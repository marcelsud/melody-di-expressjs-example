FROM node:lts-alpine

COPY . /app
WORKDIR /app

RUN rm -rf /app/node_modules
RUN npm run setup

CMD [ "npm", "run", "start" ]