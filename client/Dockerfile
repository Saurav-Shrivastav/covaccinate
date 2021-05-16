# Stage 1 - Build Phase
FROM node:lts-alpine

WORKDIR "/app"

COPY package.json .

RUN npm install

COPY . .

RUN npm run build


# Stage 2 - Run Phase
FROM nginx:1.19.0-alpine

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=0 /app/build /usr/share/nginx/html
