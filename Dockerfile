# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY frontend ./frontend
COPY backend ./backend

# Install the application dependencies
RUN npm install

# Define the entry point for the container
CMD npm start
