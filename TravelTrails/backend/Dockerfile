# backend

# Use an official Node.js image based on Alpine
FROM node:21

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the necessary port
EXPOSE 4000

# Define the command to run the application
CMD ["npm", "start"]