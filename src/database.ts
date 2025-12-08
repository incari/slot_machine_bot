import Database from "better-sqlite3";
import * as path from "path";
import * as fs from "fs";

// Determine database path - use /app/data in Docker, or local data folder
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "../data");
const DB_PATH = path.join(DATA_DIR, "slotbot.db");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Create database connection
export const db = new Database(DB_PATH);

// Enable WAL mode for better concurrent access
db.pragma("journal_mode = WAL");

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    balance INTEGER DEFAULT 10000,
    language TEXT DEFAULT 'es',
    lastBet INTEGER,
    lastLoginDate TEXT,
    consecutiveDays INTEGER DEFAULT 0,
    totalLoginDays INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    referredBy INTEGER,
    referralCount INTEGER DEFAULT 0,
    referralEarnings INTEGER DEFAULT 0,
    totalSpins INTEGER DEFAULT 0,
    totalWins INTEGER DEFAULT 0,
    totalWinnings INTEGER DEFAULT 0,
    -- JSON fields for complex/flexible data
    activeUpgrades TEXT DEFAULT '[]',
    shopOffers TEXT DEFAULT '[]',
    dailyGoals TEXT DEFAULT '[]',
    -- Runtime fields (not persisted between restarts)
    isSpinning INTEGER DEFAULT 0,
    spinLockTime INTEGER
  );

  CREATE TABLE IF NOT EXISTS jackpot (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    amount INTEGER DEFAULT 1000
  );

  -- Initialize jackpot if not exists
  INSERT OR IGNORE INTO jackpot (id, amount) VALUES (1, 1000);
`);

console.log(`Database initialized at: ${DB_PATH}`);

export default db;

