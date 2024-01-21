FROM node:16.17.1-alpine@sha256:4e36c3dee7c32cef5bfce5bc1b5013d1c3cc542cfdefde2a545ec641e7c94243 AS builder
WORKDIR /app

ENV NODE_ENV=development
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY ./tsconfig.json .
COPY ./src ./src
RUN npm run build

FROM node:16.17.1-alpine@sha256:4e36c3dee7c32cef5bfce5bc1b5013d1c3cc542cfdefde2a545ec641e7c94243
WORKDIR /app

ENV NODE_ENV=production
COPY --from=builder /app/dist .
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
