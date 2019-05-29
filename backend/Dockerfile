FROM node:10.15.1
WORKDIR /home/app/backend/
COPY / .
RUN git config --global url."https://".insteadOf git://
RUN npm install

EXPOSE 3000
CMD ["node", "src/app.js"]