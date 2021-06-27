FROM nginx:1.19.0-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# COPY docker/nginx/certs/private.key /etc/nginx/certs/private.key
# COPY docker/nginx/certs/certificate.crt /etc/nginx/certs/certificate.crt

# VOLUME [ "/etc/nginx" ]
# VOLUME [ "/etc/nginx/certs" ]
