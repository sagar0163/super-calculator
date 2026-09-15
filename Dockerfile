FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY src/ ./src/

RUN npm link

ENTRYPOINT ["calc"]
CMD ["--help"]
