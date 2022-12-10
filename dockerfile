FROM amazonlinux

# shell scripts
WORKDIR /app
ADD start_ami.sh /app
RUN chmod +x /app/start_ami.sh
EXPOSE 3000

CMD [ "./start_ami.sh" ]
