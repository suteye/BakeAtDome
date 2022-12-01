FROM node:16

# shell scripts
WORKDIR /app
ADD start_ubuntu.sh /app
RUN chmod +x /app/start_ubuntu.sh
EXPOSE 3000

CMD [ "/bin/bash", "./start_ubuntu.sh" ]
