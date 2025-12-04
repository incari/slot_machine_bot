# 🚀 Quick Start - Deploy Your Slot Bot

## On Your Server (3 Commands)

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/slot-bot.git
cd slot-bot

# 2. Run the deployment script
./deploy.sh

# 3. Done! Your bot is live 🎉
```

The script will:
- ✅ Check if Docker is installed
- ✅ Ask for your bot token
- ✅ Create necessary files
- ✅ Build and start the bot

---

## Manual Deployment

If you prefer manual steps:

```bash
# 1. Create .env file
echo "BOT_TOKEN=your_bot_token_here" > .env

# 2. Create empty users.json
echo "{}" > users.json

# 3. Start the bot
docker-compose up -d

# 4. View logs
docker-compose logs -f
```

---

## Useful Commands

```bash
# View logs
docker-compose logs -f

# Stop bot
docker-compose down

# Restart bot
docker-compose restart

# Update bot (after code changes)
git pull && docker-compose up -d --build

# Check status
docker-compose ps

# Backup user data
cp users.json users.json.backup
```

---

## Share Your Bot

Once deployed, share this link with users:

```
https://t.me/YourBotUsername
```

Replace `YourBotUsername` with your actual bot username from @BotFather.

---

## Troubleshooting

**Bot not starting?**
```bash
docker-compose logs
```

**Need to reset user data?**
```bash
echo "{}" > users.json
docker-compose restart
```

**Update bot token?**
```bash
nano .env  # Edit BOT_TOKEN
docker-compose restart
```

---

## What Happens When Users Start the Bot?

1. User searches for `@YourBotUsername` in Telegram
2. User clicks "Start"
3. Bot automatically creates a new entry in `users.json`
4. User gets:
   - 10,000 TON starting balance
   - Daily login bonus system
   - Their own game progress
5. Each user is completely independent!

---

## File Structure

```
slot-bot/
├── .env                    # Your bot token (SECRET!)
├── users.json              # User data (starts empty: {})
├── docker-compose.yml      # Docker configuration
├── Dockerfile              # Docker image
└── src/                    # Bot code
```

---

## Need Help?

See detailed documentation:
- **Docker Deployment**: `DOCKER_DEPLOYMENT.md`
- **General Deployment**: `DEPLOYMENT.md`

---

**Ready to deploy? Run `./deploy.sh` on your server!** 🎰

