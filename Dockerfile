
# Use an official Node.js runtime as a parent image
FROM node:18-alpine 


# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

RUN npm run build

# Expose the port your app runs on
EXPOSE 7680

# Define the command to run your app
CMD ["npm", "start"]