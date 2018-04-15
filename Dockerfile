FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./signup-login/package.json /usr/src/app/
RUN npm install
RUN npm install bcrypt
COPY ./signup-login/ /usr/src/app
EXPOSE 4000
CMD [ "npm", "start" ]
