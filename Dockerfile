FROM node:16

WORKDIR /mailbee

COPY ./src/ /mailbee/
RUN npm install
RUN npm run-script build

EXPOSE 3000
CMD [ "node", "./dist/app.js" ]