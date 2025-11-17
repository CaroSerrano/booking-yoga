FROM node:22-slim

WORKDIR /app

COPY package.json package-lock.json ./
COPY domain/package*.json ./domain/
COPY apps/backend/package*.json ./apps/backend/

RUN npm install --prefix ./domain
RUN npm install --prefix ./apps/backend
RUN npx prisma generate --prefix ./apps/backend

COPY ./ ./

RUN npx tsc --project ./domain/tsconfig.json
RUN npx tsc --project ./apps/backend/tsconfig.json

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node ./apps/backend/dist/index.js"]