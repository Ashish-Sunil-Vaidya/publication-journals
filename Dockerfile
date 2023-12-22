# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the frontend and backend folders into the working directory
COPY frontend ./frontend
COPY backend ./backend

# Install the frontend and backend dependencies
RUN cd frontend && npm install
RUN cd backend && npm install

# Define the entry point for the container
# Start the frontend on port 3000 and the backend on port 5000
CMD cd frontend && npm start & cd backend && npm start

EXPOSE 5000