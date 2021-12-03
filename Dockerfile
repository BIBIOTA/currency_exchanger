FROM node:14-alpine as publish
WORKDIR /app
RUN apk update \
    && npm install -g npm
ARG PORT
ENV PORT=${PORT}
RUN echo PORT >> /app/.env

COPY package.json ./
COPY . .

WORKDIR /app
RUN npm install
RUN chown -R node:node /app
EXPOSE 80
CMD [ "node", "index.js" ]

