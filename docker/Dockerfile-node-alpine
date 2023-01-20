FROM node:18

WORKDIR /mailbee

COPY ./src/ /mailbee/
RUN npm install
RUN npm run-script build

EXPOSE 80
EXPOSE 443
CMD [ "node", "./dist/app.js" ]