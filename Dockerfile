FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./signup-login/package.json /usr/src/app/
RUN npm install
COPY ./signup-login/ /usr/src/app
EXPOSE 3000
EXPOSE 4000
CMD [ "npm", "start" ]