FROM node:alpine

RUN npm install -g react react-dom next

RUN mkdir -p /src/app

WORKDIR /src/app

COPY package*.json ./

RUN npm cache clean --force && npm install --force

COPY . .

RUN next build

CMD ["node","server.js"]