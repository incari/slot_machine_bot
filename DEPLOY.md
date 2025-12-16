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

2.  **Authenticate with GitHub Container Registry** (Required for private repos):
    - Go to GitHub -> Settings -> Developer Settings -> Personal Access Tokens (Classic).
    - Generate a new token with `read:packages` scope.
    - On your server run:
    ```bash
    export CR_PAT=YOUR_TOKEN_HERE
    echo $CR_PAT | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
    ```

3.  **Create .env file**:
    ```bash
    echo "BOT_TOKEN=your_token_here" > .env
    echo "ADMIN_ID=your_id_here" >> .env
    ```

4.  **Run the bot**:
    ```bash
    docker-compose up -d
    ```

4.  **View Logs**:
    ```bash
    docker-compose logs -f
    ```

## Data Persistence
Data is stored in SQLite (`data/slotbot.db`) and persisted via Docker volume.
- The database is automatically created on first run.
- Data is stored in the `./data` directory which is mounted as a volume.
