FROM node:18.12.1

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm install -g nodemon

CMD ["npm", "run", "dev"]