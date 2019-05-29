FROM node:8
RUN useradd -ms /bin/bash user
WORKDIR /home/app/blockchain
COPY / .
RUN chown -R user:user .
RUN npm install -g truffle --unsafe
USER user
RUN npm install 
CMD ["truffle", "migrate --network ${ENV} --reset"]