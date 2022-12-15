FROM nginx

EXPOSE 80

COPY ./default.conf /etc/nginx/conf.d/default.conf

#start nginx in foreground to play nice with docker
CMD ["nginx", "-g", "daemon off;"]