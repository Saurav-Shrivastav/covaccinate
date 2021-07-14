#!/bin/sh

# if [ "$DATABASE" = "postgres" ]
# then
#     echo "Waiting for postgres..."

#     while ! nc -z $SQL_HOST $SQL_PORT; do
#         sleep 0.1
#     done

#     echo "PostgreSQL started"
# fi

# exec "$@"

name=$(sudo docker ps -aqf "name=abiswas_be19_mailer")
container_ip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $name)
echo $container_ip
export ALLOWED_IPS=container_ip
