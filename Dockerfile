# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create users.json if it doesn't exist
RUN touch users.json

# Set environment variables (will be overridden by docker-compose or -e flag)
ENV NODE_ENV=production

# Run the bot
CMD ["npm", "start"]

