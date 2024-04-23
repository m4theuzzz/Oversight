FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install --include=dev

EXPOSE 3001

CMD ["npm", "run", "start:dev"]
