FROM node:20-alpine

WORKDIR /app

ENV PORT 80

COPY . .

WORKDIR /app/oversight

RUN yarn

EXPOSE 80

CMD ["yarn", "dev", "--port=80"]
