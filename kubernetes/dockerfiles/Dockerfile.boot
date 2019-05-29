FROM alpine:3.8

RUN \
  apk add --update git go make gcc musl-dev linux-headers ca-certificates openssl bash && \
  update-ca-certificates                                                               && \
  git clone https://github.com/ethereum/go-ethereum                                    && \
  (cd go-ethereum && make all)                                                         && \
  cp go-ethereum/build/bin/bootnode /bootnode                                          && \
  cp go-ethereum/build/bin/geth /geth                                                  && \
  apk del git go make gcc musl-dev linux-headers                                       && \
  rm -rf /go-ethereum && rm -rf /var/cache/apk/*

RUN \
  wget https://raw.githubusercontent.com/MaximilianMeister/kuberneteth/master/scripts/start_boot.sh -O /start_boot.sh && \
  chmod +x /start_boot.sh

EXPOSE 30303

ENTRYPOINT ["/start_boot.sh"]
