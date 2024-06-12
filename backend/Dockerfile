FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY keycloak.json /usr/src/app/keycloak.json

EXPOSE 3000

CMD ["node", "server.js"]
