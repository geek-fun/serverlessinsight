FROM node:18.20.3-buster-slim@sha256:95fb3cf1d1ab1834c0fd65cdd2246198662460ae8f982a6cfab187889dd54bbe AS builder
WORKDIR /app

ENV NODE_ENV=development
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY ./tsconfig.json .
COPY ./src ./src
RUN npm run build

FROM node:18.20.3-buster-slim@sha256:95fb3cf1d1ab1834c0fd65cdd2246198662460ae8f982a6cfab187889dd54bbe
WORKDIR /app

ENV NODE_ENV=production
COPY --from=builder /app/dist .
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
