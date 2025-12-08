/**
 * Migration script: JSON to SQLite
 * 
 * Run this script ONCE to migrate existing data from users.json and jackpot.json to SQLite.
 * 
 * Usage: npx ts-node src/migrate-json-to-sqlite.ts
 * Or after build: node dist/migrate-json-to-sqlite.js
 */

import * as fs from "fs";
import * as path from "path";
import { db } from "./database";

const USERS_FILE = path.join(__dirname, "../users.json");
const JACKPOT_FILE = path.join(__dirname, "../jackpot.json");

console.log("🚀 Starting migration from JSON to SQLite...\n");

// Migrate users
if (fs.existsSync(USERS_FILE)) {
  console.log(`📁 Found users.json, migrating...`);
  
  try {
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    const users = JSON.parse(data);
    
    const insertStmt = db.prepare(`
      INSERT OR REPLACE INTO users (
        id, balance, language, lastBet, lastLoginDate, consecutiveDays,
        totalLoginDays, level, xp, referredBy, referralCount, referralEarnings,
        totalSpins, totalWins, totalWinnings, activeUpgrades, shopOffers, dailyGoals
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const insertMany = db.transaction((users: any[]) => {
      for (const user of users) {
        insertStmt.run(
          user.id,
          user.balance ?? 10000,
          user.language ?? "es",
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
          JSON.stringify(user.dailyGoals || [])
        );
      }
    });
    
    const userList = Object.values(users);
    insertMany(userList);
    
    console.log(`✅ Migrated ${userList.length} users successfully!`);
    
    // Rename old file as backup
    const backupPath = USERS_FILE + ".backup";
    fs.renameSync(USERS_FILE, backupPath);
    console.log(`📦 Original users.json backed up to users.json.backup\n`);
    
  } catch (error) {
    console.error("❌ Error migrating users:", error);
  }
} else {
  console.log("ℹ️  No users.json found, skipping user migration.\n");
}

// Migrate jackpot
if (fs.existsSync(JACKPOT_FILE)) {
  console.log(`📁 Found jackpot.json, migrating...`);
  
  try {
    const data = fs.readFileSync(JACKPOT_FILE, "utf-8");
    const jackpot = JSON.parse(data);
    
    if (typeof jackpot.amount === "number" && !isNaN(jackpot.amount)) {
      db.prepare(`UPDATE jackpot SET amount = ? WHERE id = 1`).run(jackpot.amount);
      console.log(`✅ Migrated jackpot: ${jackpot.amount} credits`);
      
      // Rename old file as backup
      const backupPath = JACKPOT_FILE + ".backup";
      fs.renameSync(JACKPOT_FILE, backupPath);
      console.log(`📦 Original jackpot.json backed up to jackpot.json.backup\n`);
    } else {
      console.log("⚠️  Invalid jackpot amount, using default 1000");
    }
    
  } catch (error) {
    console.error("❌ Error migrating jackpot:", error);
  }
} else {
  console.log("ℹ️  No jackpot.json found, skipping jackpot migration.\n");
}

console.log("🎉 Migration complete!");
console.log("\nYour data is now stored in: data/slotbot.db");
console.log("You can safely delete the .backup files after verifying the migration.");

