FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install --include=dev

EXPOSE 3000

CMD ["npm", "run", "start"]
