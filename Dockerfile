FROM node:8-slim

WORKDIR /src

COPY . /src
RUN npm install

EXPOSE 80
CMD [ "npm", "start" ]