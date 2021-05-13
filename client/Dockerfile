# Stage 1 - Build Phase
FROM node:12.16.1-alpine

WORKDIR "/app"

COPY package.json .

RUN npm install

COPY . .

RUN npm run build


# Stage 2 - Run Phase
FROM nginx

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=0 /app/build /usr/share/nginx/html
