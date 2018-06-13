FROM dulce/dulce:base-dev

WORKDIR /usr/src/app

ADD Server/package.json /usr/src/app/

RUN npm install

ADD  Server /usr/src/app

CMD ["npm", "run", "coverage"]
