#!/bin/bash

# Slot Bot Docker Deployment Script
# Usage: ./deploy.sh

set -e

echo "🎰 Telegram Slot Bot - Docker Deployment"
echo "========================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed!"
    echo "Please install Docker first: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed!"
    echo "Please install Docker Compose first"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo ""
    read -p "Enter your Telegram Bot Token: " bot_token
    echo "BOT_TOKEN=$bot_token" > .env
    echo "NODE_ENV=production" >> .env
    echo "✅ Created .env file"
else
    echo "✅ .env file found"
fi

echo ""

# Create users.json if it doesn't exist
if [ ! -f users.json ]; then
    echo "{}" > users.json
    echo "✅ Created empty users.json"
else
    echo "✅ users.json exists ($(wc -l < users.json | tr -d ' ') users)"
fi

echo ""
echo "🚀 Building and starting the bot..."
echo ""

# Build and start the container
docker-compose up -d --build

echo ""
echo "✅ Bot is now running!"
echo ""
echo "📊 Useful commands:"
echo "  View logs:        docker-compose logs -f"
echo "  Stop bot:         docker-compose down"
echo "  Restart bot:      docker-compose restart"
echo "  Check status:     docker-compose ps"
echo ""
echo "🎮 Share your bot with users:"
echo "  https://t.me/YourBotUsername"
echo ""
echo "📝 View logs now? (y/n)"
read -p "> " show_logs

if [ "$show_logs" = "y" ] || [ "$show_logs" = "Y" ]; then
    docker-compose logs -f
fi

