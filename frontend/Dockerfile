FROM node:14.17.3-buster-slim
WORKDIR /tmp
RUN apt-get update && apt-get -y upgrade && apt-get -y dist-upgrade && apt-get install -y alien libaio1 && apt-get -y install wget
RUN apt-get install -y python
RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app
ADD package.json /app/package.json 
RUN npm install
ADD . /app
RUN npm i -g serve
RUN npm run build
USER node
EXPOSE 3000
CMD ["serve", "-s", "build"]