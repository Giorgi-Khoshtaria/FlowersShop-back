# Use an official Node.js runtime as a parent image
FROM node:20.15.1-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install --production
RUN npm install -g nodemon

# Copy the rest of the application code to the working directory
COPY . .

# Copy the .env file into the container
COPY .env .env

# Expose the port that your application runs on
EXPOSE 3005

# Command to run your application using nodemon
CMD ["nodemon", "index.js"]
