FROM node:latest

RUN npm install -g nodemon

EXPOSE 3000

RUN mkdir -p /src/app

WORKDIR /src/app

COPY package*.json ./

RUN npm cache clean --force && npm install --quiet

CMD ["npm","run", "dev"]