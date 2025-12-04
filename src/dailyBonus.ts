import { User } from "./types";

// Daily bonus rewards based on consecutive days
export const DAILY_BONUSES = [
  { day: 1, bonus: 100, emoji: "🎁" },
  { day: 2, bonus: 150, emoji: "🎁" },
  { day: 3, bonus: 200, emoji: "🎁" },
  { day: 4, bonus: 300, emoji: "🎁" },
  { day: 5, bonus: 500, emoji: "🎁" },
  { day: 6, bonus: 750, emoji: "🎁" },
  { day: 7, bonus: 1000, emoji: "🎉" },
  { day: 8, bonus: 1200, emoji: "🎉" },
  { day: 9, bonus: 1500, emoji: "🎉" },
  { day: 10, bonus: 2000, emoji: "🎉" },
  { day: 11, bonus: 2500, emoji: "🎉" },
  { day: 12, bonus: 3000, emoji: "🎉" },
  { day: 13, bonus: 3500, emoji: "🎉" },
  { day: 14, bonus: 5000, emoji: "💎" },
  { day: 15, bonus: 6000, emoji: "💎" },
  { day: 16, bonus: 7000, emoji: "💎" },
  { day: 17, bonus: 8000, emoji: "💎" },
  { day: 18, bonus: 9000, emoji: "💎" },
  { day: 19, bonus: 10000, emoji: "💎" },
  { day: 20, bonus: 12000, emoji: "💎" },
  { day: 21, bonus: 15000, emoji: "👑" },
  { day: 22, bonus: 17000, emoji: "👑" },
  { day: 23, bonus: 19000, emoji: "👑" },
  { day: 24, bonus: 21000, emoji: "👑" },
  { day: 25, bonus: 23000, emoji: "👑" },
  { day: 26, bonus: 25000, emoji: "👑" },
  { day: 27, bonus: 27000, emoji: "👑" },
  { day: 28, bonus: 30000, emoji: "👑" },
  { day: 29, bonus: 33000, emoji: "👑" },
  { day: 30, bonus: 50000, emoji: "🏆" },
];

// Get today's date in YYYY-MM-DD format
export function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

// Get yesterday's date in YYYY-MM-DD format
export function getYesterdayDate(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

// Check if user can claim daily bonus
export function canClaimDailyBonus(user: User): boolean {
  const today = getTodayDate();
  
  // If no last login date, user can claim
  if (!user.lastLoginDate) {
    return true;
  }
  
  // If last login was today, cannot claim again
  if (user.lastLoginDate === today) {
    return false;
  }
  
  // Otherwise, user can claim
  return true;
}

// Calculate the bonus for the current streak
export function getDailyBonusAmount(consecutiveDays: number): number {
  // Cap at 30 days, then cycle
  const effectiveDay = ((consecutiveDays - 1) % 30) + 1;
  const bonusData = DAILY_BONUSES.find(b => b.day === effectiveDay);
  return bonusData ? bonusData.bonus : 100; // Default to 100 if not found
}

// Get bonus emoji for the current streak
export function getDailyBonusEmoji(consecutiveDays: number): string {
  const effectiveDay = ((consecutiveDays - 1) % 30) + 1;
  const bonusData = DAILY_BONUSES.find(b => b.day === effectiveDay);
  return bonusData ? bonusData.emoji : "🎁";
}

// Process daily login and return bonus info
export interface DailyBonusResult {
  claimed: boolean;
  bonus: number;
  consecutiveDays: number;
  streakBroken: boolean;
  alreadyClaimed: boolean;
}

export function processDailyLogin(user: User): DailyBonusResult {
  const today = getTodayDate();
  const yesterday = getYesterdayDate();
  
  // Initialize if first time
  if (!user.lastLoginDate) {
    user.consecutiveDays = 1;
    user.totalLoginDays = 1;
    user.lastLoginDate = today;
    const bonus = getDailyBonusAmount(1);
    return {
      claimed: true,
      bonus,
      consecutiveDays: 1,
      streakBroken: false,
      alreadyClaimed: false,
    };
  }
  
  // Already claimed today
  if (user.lastLoginDate === today) {
    return {
      claimed: false,
      bonus: 0,
      consecutiveDays: user.consecutiveDays || 1,
      streakBroken: false,
      alreadyClaimed: true,
    };
  }
  
  // Check if streak continues (logged in yesterday)
  const streakContinues = user.lastLoginDate === yesterday;
  
  if (streakContinues) {
    // Continue streak
    user.consecutiveDays = (user.consecutiveDays || 1) + 1;
    user.totalLoginDays = (user.totalLoginDays || 1) + 1;
  } else {
    // Streak broken, reset to 1
    user.consecutiveDays = 1;
    user.totalLoginDays = (user.totalLoginDays || 0) + 1;
  }
  
  user.lastLoginDate = today;
  const bonus = getDailyBonusAmount(user.consecutiveDays);
  
  return {
    claimed: true,
    bonus,
    consecutiveDays: user.consecutiveDays,
    streakBroken: !streakContinues && (user.totalLoginDays || 0) > 1,
    alreadyClaimed: false,
  };
}

