FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY seed.js /usr/src/app/
COPY /models/User.js /usr/src/app
RUN npm install
# RUN npm run seed
RUN npm install -g nodemon

# Bundle app source

EXPOSE 3000
CMD [ "npm", "start", "-L" ]