# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy source code
COPY . .

# Build TypeScript
RUN yarn build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN yarn install --production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Create data directory for persistence
RUN mkdir -p /app/data

# Expose port (if needed, though bot uses polling)
# EXPOSE 3000

# Start the bot
CMD ["node", "dist/bot.js"]
