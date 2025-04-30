FROM node:21.7.3-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

EXPOSE 9000

COPY . .

CMD ["yarn", "dev"]
