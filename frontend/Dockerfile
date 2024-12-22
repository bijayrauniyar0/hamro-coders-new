# Use Node.js version 21.7.3 as the base image
FROM node:21.7.3-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the application code
COPY . .

# Build the React application
RUN yarn build

# Expose the frontend port
EXPOSE 5173

# Serve the React app
CMD ["yarn", "dev", "--host"]
