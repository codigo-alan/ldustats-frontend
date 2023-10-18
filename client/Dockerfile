# Use image of Node.js
FROM node:16.17.1

# Stablish working directory in /app
WORKDIR /app

# Copy files of project to container
COPY package*.json ./
COPY vite.config.js ./
COPY public ./public
COPY src ./src

# Install project dependencies
RUN npm install

# Compile React application
#RUN npm run build #Not possibe to execute this line in the build of docker image

# Expose a port in the Docker (the port where works the react app)
EXPOSE 5173

# Define command to execute the react app when the container is initialized
CMD [ "npm", "run", "dev" ]