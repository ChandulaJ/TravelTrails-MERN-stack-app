FROM node:21-alpine

WORKDIR /app

# Install build tools
RUN apk add --no-cache python3 make g++ 

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
