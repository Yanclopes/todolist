FROM node:18 as base
RUN dnf install -y procps g++

FROM base as dev
WORKDIR /app
COPY package.json .
COPY package-lock.json .
ENV NODE_ENV=development
RUN npm ci

FROM base as build
WORKDIR /app
COPY ./src ./src
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
RUN npm ci && npm run build

FROM base as prod
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules/ ./node_modules
COPY --from=build /app/build/ /app
COPY --from=build /app/package.json/ .
COPY --from=build /app/package-lock.json/ .
COPY --from=build /app/build/ /build.info
EXPOSE 3000
CMD npm run start:prod