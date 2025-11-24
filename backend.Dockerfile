FROM node:22-slim

WORKDIR /app

COPY package.json package-lock.json ./
COPY domain/package*.json ./domain/
COPY apps/backend/package*.json ./apps/backend/

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN npm install

COPY ./ ./

RUN npm run prisma:generate --workspace=apps/backend
RUN npx tsc --project ./domain/tsconfig.json
RUN npx tsc --project ./apps/backend/tsconfig.json

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy --schema=./apps/backend/prisma/schema.prisma  && node ./apps/backend/dist/index.js"]