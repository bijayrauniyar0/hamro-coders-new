# Use the official Node.js Alpine image
FROM node:21.7.3-alpine

# Set the working directory
WORKDIR /app

# Copy package files first for efficient caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .


# Expose the application port
EXPOSE 9000

# Define environment variables for PostgreSQL (optional; can also be in Docker Compose)
ENV DB_USER=hamrocoders
ENV DB_HOST=localhost
ENV DB_DATABASE=hamrocoders
ENV DB_PASSWORD=hamrocoders@123
ENV DB_PORT=8080

# Command to run the application
CMD ["yarn", "dev"]
