# Deployment Instructions

## Prerequisites
- Docker and Docker Compose installed on your server.
- A `.env` file with `BOT_TOKEN` and `ADMIN_ID`.

## Quick Start (Docker Compose)

1.  **Clone the repository** (or copy files to server):
    ```bash
    git clone <your-repo-url>
    cd slot-bot
    ```

2.  **Create .env file**:
    ```bash
    echo "BOT_TOKEN=your_token_here" > .env
    echo "ADMIN_ID=your_id_here" >> .env
    ```

3.  **Run the bot**:
    ```bash
    docker-compose up -d --build
    ```

4.  **View Logs**:
    ```bash
    docker-compose logs -f
    ```

## Data Persistence
The `users.json` file is mounted as a volume.
- If you have an existing `users.json`, place it in the project root before starting.
- Changes to user data will be saved to your local `users.json` file.
