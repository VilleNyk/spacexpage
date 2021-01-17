FROM ubuntu
EXPOSE 80

RUN apt-get update
RUN apt-get install nginx -y
COPY / /var/www/html/


CMD nginx -g 'daemon off;'