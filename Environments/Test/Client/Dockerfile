FROM dulce/dulce:base-dev

COPY Client/package.json /usr/src/app/package.json

RUN npm i -g npm
RUN npm install --development
ADD Client/ /usr/src/app/

EXPOSE 8080

CMD ["npm","start"]
