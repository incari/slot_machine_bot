# Build stage
FROM node:24-alpine AS builder

# Install build dependencies for better-sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build TypeScript
RUN yarn build

# Production stage
FROM node:24-alpine

# Install build dependencies for better-sqlite3 (needed for native module)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Create data directory for persistence
RUN mkdir -p /app/data

# Start the bot
CMD ["node", "dist/bot.js"]
