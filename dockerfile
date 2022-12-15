FROM amazonlinux

# shell scripts
WORKDIR /app
ADD shell_script.sh /app
RUN chmod +x /app/shell_script.sh
EXPOSE 3000

CMD [ "./shell_script.sh" ]
