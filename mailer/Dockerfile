FROM node:lts-alpine

USER root

WORKDIR /home/app

COPY . .

RUN ["npm", "install"]

RUN ["npm", "install", "-g", "typescript", "pm2"]

RUN ["tsc"]

CMD ["pm2-runtime", "start", "ecosystem.config.js"]