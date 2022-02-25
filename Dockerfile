
# base for our image, based on buildpack-deps, based on Debian Linux
FROM node:lts

# Create app directory
WORKDIR /opt/api-jooycar

# Install app dependencies
COPY package.json ./
COPY tsconfig.json ./
RUN npm install

# Build JavaScript from TypeScript
COPY . .
RUN ls -a
RUN npm run build

# Tell docker which port will be used (not published)
EXPOSE 3000

# Default env file
ENV ENV_FILE=.env

# Run this app when a container is launched
CMD [ "node", "./dist/app.js" ]