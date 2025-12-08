import { User, ActiveUpgrade, DailyGoal } from "./types";
import { db } from "./database";

// Prepared statements for better performance
const getStmt = db.prepare(`SELECT * FROM users WHERE id = ?`);
const insertStmt = db.prepare(`
  INSERT INTO users (id, balance, language) VALUES (?, 10000, 'es')
`);
const updateStmt = db.prepare(`
  UPDATE users SET
    balance = ?,
    language = ?,
    lastBet = ?,
    lastLoginDate = ?,
    consecutiveDays = ?,
    totalLoginDays = ?,
    level = ?,
    xp = ?,
    referredBy = ?,
    referralCount = ?,
    referralEarnings = ?,
    totalSpins = ?,
    totalWins = ?,
    totalWinnings = ?,
    activeUpgrades = ?,
    shopOffers = ?,
    dailyGoals = ?,
    isSpinning = ?,
    spinLockTime = ?
  WHERE id = ?
`);
const getAllStmt = db.prepare(`SELECT * FROM users`);

// Convert database row to User object
function rowToUser(row: any): User {
  return {
    id: row.id,
    balance: row.balance,
    language: row.language,
    lastBet: row.lastBet ?? undefined,
    lastLoginDate: row.lastLoginDate ?? undefined,
    consecutiveDays: row.consecutiveDays ?? undefined,
    totalLoginDays: row.totalLoginDays ?? undefined,
    level: row.level ?? undefined,
    xp: row.xp ?? undefined,
    referredBy: row.referredBy ?? undefined,
    referralCount: row.referralCount ?? undefined,
    referralEarnings: row.referralEarnings ?? undefined,
    totalSpins: row.totalSpins ?? undefined,
    totalWins: row.totalWins ?? undefined,
    totalWinnings: row.totalWinnings ?? undefined,
    activeUpgrades: JSON.parse(row.activeUpgrades || "[]") as ActiveUpgrade[],
    shopOffers: JSON.parse(row.shopOffers || "[]") as number[],
    dailyGoals: JSON.parse(row.dailyGoals || "[]") as DailyGoal[],
    isSpinning: row.isSpinning === 1,
    spinLockTime: row.spinLockTime ?? undefined,
  };
}

export function getUser(id: number): User {
  let row = getStmt.get(id);

  if (!row) {
    insertStmt.run(id);
    row = getStmt.get(id);
  }

  return rowToUser(row);
}

export function updateUser(user: User) {
  updateStmt.run(
    user.balance,
    user.language,
    user.lastBet ?? null,
    user.lastLoginDate ?? null,
    user.consecutiveDays ?? 0,
    user.totalLoginDays ?? 0,
    user.level ?? 1,
    user.xp ?? 0,
    user.referredBy ?? null,
    user.referralCount ?? 0,
    user.referralEarnings ?? 0,
    user.totalSpins ?? 0,
    user.totalWins ?? 0,
    user.totalWinnings ?? 0,
    JSON.stringify(user.activeUpgrades || []),
    JSON.stringify(user.shopOffers || []),
    JSON.stringify(user.dailyGoals || []),
    user.isSpinning ? 1 : 0,
    user.spinLockTime ?? null,
    user.id
  );
}

// Set user language
export function setUserLanguage(id: number, language: string) {
  const user = getUser(id);
  user.language = language;
  updateUser(user);
}

// Get all users (for broadcasting)
export function getAllUsers(): User[] {
  const rows = getAllStmt.all();
  return rows.map(rowToUser);
}
