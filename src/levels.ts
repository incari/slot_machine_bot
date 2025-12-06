import { User } from "./types";

// XP required for each level (simple quadratic curve)
// Level 1: 0 XP
// Level 2: 100 XP
// Level 3: 300 XP
// Level 4: 600 XP
// ...
export const getXpForLevel = (level: number): number => {
  if (level <= 1) return 0;
  return 50 * (level - 1) * level;
};

export const calculateLevel = (xp: number): number => {
  let level = 1;
  while (xp >= getXpForLevel(level + 1)) {
    level++;
  }
  return level;
};

export const getLevelProgress = (xp: number, level: number) => {
  const currentLevelXp = getXpForLevel(level);
  const nextLevelXp = getXpForLevel(level + 1);
  const progress = xp - currentLevelXp;
  const totalNeeded = nextLevelXp - currentLevelXp;
  
  return {
    current: progress,
    total: totalNeeded,
    percentage: Math.min(100, Math.floor((progress / totalNeeded) * 100))
  };
};

// Level Bonuses
// Level 1-4: 0%
// Level 5-9: 1%
// Level 10-19: 2%
// Level 20+: 5%
export const getLevelBonus = (level: number): number => {
  if (level >= 20) return 1.05;
  if (level >= 10) return 1.02;
  if (level >= 5) return 1.01;
  return 1.0;
};

export const getLevelTitle = (level: number): string => {
  if (level >= 50) return "👑 Slot King";
  if (level >= 30) return "💎 Diamond Hand";
  if (level >= 20) return "🔥 High Roller";
  if (level >= 10) return "⭐ Pro Player";
  if (level >= 5) return "🎲 Gambler";
  return "👶 Rookie";
};
