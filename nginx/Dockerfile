FROM nginx:1.19.0-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

COPY certificate.crt /etc/nginx/certs/certificate.crt
COPY private.key /etc/nginx/certs/private.key

VOLUME [ "/etc/nginx" ]
VOLUME [ "/etc/nginx/certs" ]
