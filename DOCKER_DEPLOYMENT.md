# Docker Deployment Guide

## Prerequisites

### On Your Local Machine:
- Git installed
- Your bot code ready

### On Your Server:
- Docker installed
- Docker Compose installed
- SSH access to the server

---

## Quick Start (3 Steps)

### 1️⃣ **Prepare Your Code**

On your local machine:

```bash
# Make sure .env file exists with your bot token
echo "BOT_TOKEN=your_bot_token_here" > .env

# Test locally first (optional)
npm run dev
```

### 2️⃣ **Deploy to Server**

#### Option A: Using Git (Recommended)

```bash
# On your local machine - push to GitHub
git add .
git commit -m "Ready for Docker deployment"
git push origin main

# On your server - clone the repository
ssh user@your-server-ip
git clone https://github.com/YOUR_USERNAME/slot-bot.git
cd slot-bot

# Create .env file on server
nano .env
# Add: BOT_TOKEN=your_bot_token_here
# Save: Ctrl+X, Y, Enter

# Start the bot
docker-compose up -d
```

#### Option B: Direct Upload (SCP)

```bash
# On your local machine
scp -r /path/to/slot-bot user@your-server-ip:/home/user/

# SSH into server
ssh user@your-server-ip
cd slot-bot

# Create .env file
nano .env
# Add: BOT_TOKEN=your_bot_token_here

# Start the bot
docker-compose up -d
```

### 3️⃣ **Verify It's Running**

```bash
# Check if container is running
docker-compose ps

# View logs
docker-compose logs -f

# You should see: "Bot iniciado..."
```

---

## Detailed Instructions

### Installing Docker on Your Server

#### Ubuntu/Debian:
```bash
# Update packages
sudo apt update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose

# Add your user to docker group (optional - to run without sudo)
sudo usermod -aG docker $USER
newgrp docker
```

#### CentOS/RHEL:
```bash
sudo yum install -y docker docker-compose
sudo systemctl start docker
sudo systemctl enable docker
```

---

## Docker Commands

### Starting the Bot
```bash
# Start in background
docker-compose up -d

# Start and view logs
docker-compose up
```

### Stopping the Bot
```bash
# Stop the bot
docker-compose down

# Stop and remove volumes (deletes user data!)
docker-compose down -v
```

### Viewing Logs
```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View last 100 lines
docker-compose logs --tail=100
```

### Restarting the Bot
```bash
# Restart after code changes
docker-compose restart

# Rebuild and restart (after major changes)
docker-compose up -d --build
```

### Updating the Bot
```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose up -d --build
```

---

## File Structure

```
slot-bot/
├── Dockerfile              # Docker image configuration
├── docker-compose.yml      # Docker Compose configuration
├── .dockerignore          # Files to exclude from Docker image
├── .env                   # Environment variables (BOT_TOKEN)
├── users.json             # User data (persisted via volume)
├── src/                   # Source code
│   ├── bot.ts
│   ├── game.ts
│   └── ...
└── package.json
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
NODE_ENV=production
```

**Security Note:** Never commit `.env` to Git! It's already in `.gitignore`.

---

## Data Persistence

User data is stored in `users.json` and persisted using Docker volumes:

```yaml
volumes:
  - ./users.json:/app/users.json
```

This means:
- ✅ Data survives container restarts
- ✅ Data survives container rebuilds
- ✅ You can backup `users.json` directly from the host

### Backing Up User Data

```bash
# Create backup
cp users.json users.json.backup

# Or with timestamp
cp users.json users.json.$(date +%Y%m%d_%H%M%S)

# Restore from backup
cp users.json.backup users.json
docker-compose restart
```

---

## Troubleshooting

### Bot Not Starting

**Check logs:**
```bash
docker-compose logs
```

**Common issues:**
- Missing `BOT_TOKEN` in `.env`
- Invalid bot token
- Port conflicts (unlikely for bots)

### Container Keeps Restarting

```bash
# View logs
docker-compose logs --tail=50

# Check if token is set
docker-compose exec slot-bot env | grep BOT_TOKEN
```

### Out of Disk Space

```bash
# Remove unused Docker images
docker system prune -a

# Check disk usage
df -h
```

### Permission Issues

```bash
# Fix users.json permissions
chmod 666 users.json

# Or run as root (not recommended)
sudo docker-compose up -d
```

---

## Advanced Configuration

### Running Multiple Bots

Create separate directories for each bot:

```bash
# Bot 1
cd ~/slot-bot-1
docker-compose up -d

# Bot 2
cd ~/slot-bot-2
docker-compose up -d
```

### Custom Port Mapping (if needed)

Edit `docker-compose.yml`:
```yaml
ports:
  - "3000:3000"  # Only if your bot has a web interface
```

### Resource Limits

Edit `docker-compose.yml`:
```yaml
services:
  slot-bot:
    # ... existing config ...
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

---

## Monitoring

### Auto-Restart on Failure

Already configured in `docker-compose.yml`:
```yaml
restart: unless-stopped
```

### Health Checks

Add to `docker-compose.yml`:
```yaml
healthcheck:
  test: ["CMD", "node", "-e", "process.exit(0)"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### Log Rotation

Already configured in `docker-compose.yml`:
```yaml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

---

## Production Checklist

- [ ] `.env` file created with valid `BOT_TOKEN`
- [ ] `.env` is in `.gitignore` (already done)
- [ ] Docker and Docker Compose installed on server
- [ ] Bot tested locally before deployment
- [ ] `users.json` has correct permissions
- [ ] Firewall allows outbound HTTPS (port 443) for Telegram API
- [ ] Backup strategy for `users.json` in place
- [ ] Monitoring/logging set up

---

## Quick Reference

```bash
# Start bot
docker-compose up -d

# Stop bot
docker-compose down

# View logs
docker-compose logs -f

# Restart bot
docker-compose restart

# Update bot
git pull && docker-compose up -d --build

# Backup data
cp users.json users.json.backup

# Check status
docker-compose ps
```

---

## Next Steps

1. **Set up automatic backups:**
   ```bash
   # Add to crontab
   0 2 * * * cp /path/to/slot-bot/users.json /path/to/backups/users.json.$(date +\%Y\%m\%d)
   ```

2. **Monitor with Portainer (optional):**
   ```bash
   docker run -d -p 9000:9000 --name portainer \
     -v /var/run/docker.sock:/var/run/docker.sock \
     portainer/portainer-ce
   ```

3. **Set up alerts** for container failures

4. **Consider migrating to a database** instead of `users.json` for better scalability

---

## Support

If you encounter issues:
1. Check logs: `docker-compose logs`
2. Verify environment variables: `docker-compose config`
3. Test bot token with @BotFather
4. Ensure server has internet access to Telegram API

Happy deploying! 🚀

