FROM node:16.14
RUN mkdir app
COPY . /app
WORKDIR /app
RUN npm install
CMD node src/index.js
EXPOSE 3000