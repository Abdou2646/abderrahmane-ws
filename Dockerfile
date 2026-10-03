FROM teddysun/xray:latest

WORKDIR /etc/xray

COPY config.json /etc/xray/config.json

ENV PORT=10000
EXPOSE 10000

CMD ["/usr/bin/xray", "-config", "/etc/xray/config.json"]
