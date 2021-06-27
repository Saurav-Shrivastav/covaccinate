FROM nginx:1.19.0-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

COPY /etc/letsencrypt/live/covaccinate.tech/fullchain.pem /etc/nginx/certs/fullchain.pem
COPY /etc/letsencrypt/live/covaccinate.tech/privkey.pem /etc/nginx/certs/privkey.pem

# VOLUME [ "/etc/nginx" ]
# VOLUME [ "/etc/nginx/certs" ]
