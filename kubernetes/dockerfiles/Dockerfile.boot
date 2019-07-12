FROM ethereum/client-go:alltools-v1.9.0

RUN \
  wget https://raw.githubusercontent.com/MaximilianMeister/kuberneteth/master/scripts/start_boot.sh -O /start_boot.sh && \
  chmod +x /start_boot.sh

EXPOSE 30303

ENTRYPOINT ["/start_boot.sh"]
