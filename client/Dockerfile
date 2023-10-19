# Use image of Node.js
FROM node:alpine

# Stablish working directory in /app
WORKDIR /app

# Copy files of project to container
COPY package*.json .
COPY vite.config.js .

# Install project dependencies
RUN npm install

COPY . .

# Compile React application
# Not possibe to execute this line in the build of docker image
RUN npm run build 

# Expose a port in the Docker (the port where works the react app)
EXPOSE 3000

# Define command to execute the react app when the container is initialized
CMD [ "npm", "run", "dev" ]