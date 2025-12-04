import { Upgrade } from "./types";

// 100 Different Upgrade Options
export const UPGRADES: Upgrade[] = [
  // PROBABILITY UPGRADES (1-30) - Increase symbol chances
  { id: 1, name: "Cherry Charm I", description: "+2% Cherry chance (5 spins)", cost: 500, type: "probability", effect: { cherryBoost: 2, spinsRemaining: 5 } },
  { id: 2, name: "Cherry Charm II", description: "+5% Cherry chance (5 spins)", cost: 1200, type: "probability", effect: { cherryBoost: 5, spinsRemaining: 5 } },
  { id: 3, name: "Cherry Charm III", description: "+10% Cherry chance (3 spins)", cost: 2500, type: "probability", effect: { cherryBoost: 10, spinsRemaining: 3 } },
  { id: 4, name: "Lemon Luck I", description: "+3% Lemon chance (5 spins)", cost: 800, type: "probability", effect: { lemonBoost: 3, spinsRemaining: 5 } },
  { id: 5, name: "Lemon Luck II", description: "+7% Lemon chance (5 spins)", cost: 1800, type: "probability", effect: { lemonBoost: 7, spinsRemaining: 5 } },
  { id: 6, name: "Lemon Luck III", description: "+12% Lemon chance (3 spins)", cost: 3500, type: "probability", effect: { lemonBoost: 12, spinsRemaining: 3 } },
  { id: 7, name: "Star Seeker I", description: "+4% Star chance (5 spins)", cost: 1000, type: "probability", effect: { starBoost: 4, spinsRemaining: 5 } },
  { id: 8, name: "Star Seeker II", description: "+8% Star chance (5 spins)", cost: 2200, type: "probability", effect: { starBoost: 8, spinsRemaining: 5 } },
  { id: 9, name: "Star Seeker III", description: "+15% Star chance (3 spins)", cost: 4500, type: "probability", effect: { starBoost: 15, spinsRemaining: 3 } },
  { id: 10, name: "Seven Heaven I", description: "+2% Seven chance (5 spins)", cost: 1500, type: "probability", effect: { sevenBoost: 2, spinsRemaining: 5 } },
  { id: 11, name: "Seven Heaven II", description: "+5% Seven chance (5 spins)", cost: 3000, type: "probability", effect: { sevenBoost: 5, spinsRemaining: 5 } },
  { id: 12, name: "Seven Heaven III", description: "+10% Seven chance (3 spins)", cost: 6000, type: "probability", effect: { sevenBoost: 10, spinsRemaining: 3 } },
  { id: 13, name: "Lucky Breeze", description: "+1% all symbols (10 spins)", cost: 600, type: "probability", effect: { cherryBoost: 1, lemonBoost: 1, starBoost: 1, sevenBoost: 1, spinsRemaining: 10 } },
  { id: 14, name: "Lucky Wind", description: "+3% all symbols (7 spins)", cost: 1500, type: "probability", effect: { cherryBoost: 3, lemonBoost: 3, starBoost: 3, sevenBoost: 3, spinsRemaining: 7 } },
  { id: 15, name: "Lucky Storm", description: "+5% all symbols (5 spins)", cost: 3000, type: "probability", effect: { cherryBoost: 5, lemonBoost: 5, starBoost: 5, sevenBoost: 5, spinsRemaining: 5 } },
  { id: 16, name: "Cherry Focus", description: "+15% Cherry, -5% others (3 spins)", cost: 1000, type: "probability", effect: { cherryBoost: 15, lemonBoost: -5, starBoost: -5, sevenBoost: -5, spinsRemaining: 3 } },
  { id: 17, name: "Lemon Focus", description: "+20% Lemon, -7% others (3 spins)", cost: 2000, type: "probability", effect: { lemonBoost: 20, cherryBoost: -7, starBoost: -7, sevenBoost: -7, spinsRemaining: 3 } },
  { id: 18, name: "Star Focus", description: "+25% Star, -8% others (3 spins)", cost: 3500, type: "probability", effect: { starBoost: 25, cherryBoost: -8, lemonBoost: -8, sevenBoost: -8, spinsRemaining: 3 } },
  { id: 19, name: "Seven Focus", description: "+15% Seven, -5% others (3 spins)", cost: 5000, type: "probability", effect: { sevenBoost: 15, cherryBoost: -5, lemonBoost: -5, starBoost: -5, spinsRemaining: 3 } },
  { id: 20, name: "Balanced Luck", description: "+2% Cherry, +2% Lemon (10 spins)", cost: 700, type: "probability", effect: { cherryBoost: 2, lemonBoost: 2, spinsRemaining: 10 } },
  { id: 21, name: "High Roller Boost", description: "+3% Star, +3% Seven (7 spins)", cost: 2500, type: "probability", effect: { starBoost: 3, sevenBoost: 3, spinsRemaining: 7 } },
  { id: 22, name: "Cherry Magnet", description: "+20% Cherry (1 spin)", cost: 800, type: "probability", effect: { cherryBoost: 20, spinsRemaining: 1 } },
  { id: 23, name: "Lemon Magnet", description: "+30% Lemon (1 spin)", cost: 1500, type: "probability", effect: { lemonBoost: 30, spinsRemaining: 1 } },
  { id: 24, name: "Star Magnet", description: "+40% Star (1 spin)", cost: 3000, type: "probability", effect: { starBoost: 40, spinsRemaining: 1 } },
  { id: 25, name: "Seven Magnet", description: "+25% Seven (1 spin)", cost: 5000, type: "probability", effect: { sevenBoost: 25, spinsRemaining: 1 } },
  { id: 26, name: "Persistent Cherry", description: "+3% Cherry (20 spins)", cost: 1500, type: "probability", effect: { cherryBoost: 3, spinsRemaining: 20 } },
  { id: 27, name: "Persistent Lemon", description: "+4% Lemon (15 spins)", cost: 2500, type: "probability", effect: { lemonBoost: 4, spinsRemaining: 15 } },
  { id: 28, name: "Persistent Star", description: "+5% Star (12 spins)", cost: 4000, type: "probability", effect: { starBoost: 5, spinsRemaining: 12 } },
  { id: 29, name: "Persistent Seven", description: "+3% Seven (10 spins)", cost: 6000, type: "probability", effect: { sevenBoost: 3, spinsRemaining: 10 } },
  { id: 30, name: "Jackpot Seeker", description: "+1% all symbols (30 spins)", cost: 2000, type: "probability", effect: { cherryBoost: 1, lemonBoost: 1, starBoost: 1, sevenBoost: 1, spinsRemaining: 30 } },

  // MULTIPLIER UPGRADES (31-55) - Increase payouts
  { id: 31, name: "Cherry Boost I", description: "1.5x Cherry payout (5 spins)", cost: 600, type: "multiplier", effect: { cherryMultiplier: 1.5, spinsRemaining: 5 } },
  { id: 32, name: "Cherry Boost II", description: "2x Cherry payout (5 spins)", cost: 1500, type: "multiplier", effect: { cherryMultiplier: 2, spinsRemaining: 5 } },
  { id: 33, name: "Cherry Boost III", description: "3x Cherry payout (3 spins)", cost: 3000, type: "multiplier", effect: { cherryMultiplier: 3, spinsRemaining: 3 } },
  { id: 34, name: "Lemon Boost I", description: "1.5x Lemon payout (5 spins)", cost: 1000, type: "multiplier", effect: { lemonMultiplier: 1.5, spinsRemaining: 5 } },
  { id: 35, name: "Lemon Boost II", description: "2x Lemon payout (5 spins)", cost: 2500, type: "multiplier", effect: { lemonMultiplier: 2, spinsRemaining: 5 } },
  { id: 36, name: "Lemon Boost III", description: "3x Lemon payout (3 spins)", cost: 5000, type: "multiplier", effect: { lemonMultiplier: 3, spinsRemaining: 3 } },
  { id: 37, name: "Star Boost I", description: "1.5x Star payout (5 spins)", cost: 1500, type: "multiplier", effect: { starMultiplier: 1.5, spinsRemaining: 5 } },
  { id: 38, name: "Star Boost II", description: "2x Star payout (5 spins)", cost: 3500, type: "multiplier", effect: { starMultiplier: 2, spinsRemaining: 5 } },
  { id: 39, name: "Star Boost III", description: "3x Star payout (3 spins)", cost: 7000, type: "multiplier", effect: { starMultiplier: 3, spinsRemaining: 3 } },
  { id: 40, name: "Seven Boost I", description: "1.5x Seven payout (5 spins)", cost: 2500, type: "multiplier", effect: { sevenMultiplier: 1.5, spinsRemaining: 5 } },
  { id: 41, name: "Seven Boost II", description: "2x Seven payout (5 spins)", cost: 5000, type: "multiplier", effect: { sevenMultiplier: 2, spinsRemaining: 5 } },
  { id: 42, name: "Seven Boost III", description: "3x Seven payout (3 spins)", cost: 10000, type: "multiplier", effect: { sevenMultiplier: 3, spinsRemaining: 3 } },
  { id: 43, name: "BAR Jackpot Boost I", description: "1.5x BAR payout (5 spins)", cost: 3000, type: "multiplier", effect: { barMultiplier: 1.5, spinsRemaining: 5 } },
  { id: 44, name: "BAR Jackpot Boost II", description: "2x BAR payout (5 spins)", cost: 6000, type: "multiplier", effect: { barMultiplier: 2, spinsRemaining: 5 } },
  { id: 45, name: "BAR Jackpot Boost III", description: "3x BAR payout (3 spins)", cost: 12000, type: "multiplier", effect: { barMultiplier: 3, spinsRemaining: 3 } },
  { id: 46, name: "Universal Boost I", description: "1.2x all wins (10 spins)", cost: 1000, type: "multiplier", effect: { universalMultiplier: 1.2, spinsRemaining: 10 } },
  { id: 47, name: "Universal Boost II", description: "1.5x all wins (7 spins)", cost: 2500, type: "multiplier", effect: { universalMultiplier: 1.5, spinsRemaining: 7 } },
  { id: 48, name: "Universal Boost III", description: "2x all wins (5 spins)", cost: 5000, type: "multiplier", effect: { universalMultiplier: 2, spinsRemaining: 5 } },
  { id: 49, name: "Universal Boost IV", description: "3x all wins (3 spins)", cost: 10000, type: "multiplier", effect: { universalMultiplier: 3, spinsRemaining: 3 } },
  { id: 50, name: "Double Trouble", description: "2x all wins (1 spin)", cost: 2000, type: "multiplier", effect: { universalMultiplier: 2, spinsRemaining: 1 } },
  { id: 51, name: "Triple Threat", description: "3x all wins (1 spin)", cost: 5000, type: "multiplier", effect: { universalMultiplier: 3, spinsRemaining: 1 } },
  { id: 52, name: "Mega Multiplier", description: "5x all wins (1 spin)", cost: 15000, type: "multiplier", effect: { universalMultiplier: 5, spinsRemaining: 1 } },
  { id: 53, name: "Cherry Power", description: "5x Cherry payout (1 spin)", cost: 2500, type: "multiplier", effect: { cherryMultiplier: 5, spinsRemaining: 1 } },
  { id: 54, name: "Lemon Power", description: "5x Lemon payout (1 spin)", cost: 5000, type: "multiplier", effect: { lemonMultiplier: 5, spinsRemaining: 1 } },
  { id: 55, name: "Star Power", description: "5x Star payout (1 spin)", cost: 10000, type: "multiplier", effect: { starMultiplier: 5, spinsRemaining: 1 } },

  // SPECIAL EFFECTS (56-80) - Unique mechanics
  { id: 56, name: "Safety Net I", description: "50% refund on loss (3 spins)", cost: 800, type: "special", effect: { insurance: 50, spinsRemaining: 3 } },
  { id: 57, name: "Safety Net II", description: "75% refund on loss (3 spins)", cost: 1500, type: "special", effect: { insurance: 75, spinsRemaining: 3 } },
  { id: 58, name: "Safety Net III", description: "100% refund on loss (1 spin)", cost: 3000, type: "special", effect: { insurance: 100, spinsRemaining: 1 } },
  { id: 59, name: "Half Risk", description: "50% refund on loss (10 spins)", cost: 2500, type: "special", effect: { insurance: 50, spinsRemaining: 10 } },
  { id: 60, name: "Quarter Risk", description: "25% refund on loss (20 spins)", cost: 1500, type: "special", effect: { insurance: 25, spinsRemaining: 20 } },
  { id: 61, name: "Cherry Guarantee", description: "Guaranteed Cherry win (1 spin)", cost: 1000, type: "special", effect: { guarantee: "cherry", spinsRemaining: 1 } },
  { id: 62, name: "Lemon Guarantee", description: "Guaranteed Lemon win (1 spin)", cost: 3000, type: "special", effect: { guarantee: "lemon", spinsRemaining: 1 } },
  { id: 63, name: "Star Guarantee", description: "Guaranteed Star win (1 spin)", cost: 8000, type: "special", effect: { guarantee: "star", spinsRemaining: 1 } },
  { id: 64, name: "Combo Cherry+Lemon", description: "+5% Cherry & Lemon, 1.5x payout (5 spins)", cost: 2000, type: "special", effect: { cherryBoost: 5, lemonBoost: 5, cherryMultiplier: 1.5, lemonMultiplier: 1.5, spinsRemaining: 5 } },
  { id: 65, name: "Combo Star+Seven", description: "+7% Star & Seven, 2x payout (3 spins)", cost: 5000, type: "special", effect: { starBoost: 7, sevenBoost: 7, starMultiplier: 2, sevenMultiplier: 2, spinsRemaining: 3 } },
  { id: 66, name: "Balanced Power", description: "+3% all, 1.5x all (5 spins)", cost: 3500, type: "special", effect: { cherryBoost: 3, lemonBoost: 3, starBoost: 3, sevenBoost: 3, universalMultiplier: 1.5, spinsRemaining: 5 } },
  { id: 67, name: "Risk Reward I", description: "+10% all, but 0% insurance (5 spins)", cost: 1500, type: "special", effect: { cherryBoost: 10, lemonBoost: 10, starBoost: 10, sevenBoost: 10, spinsRemaining: 5 } },
  { id: 68, name: "Risk Reward II", description: "+20% all, 2x payout, 0% insurance (3 spins)", cost: 4000, type: "special", effect: { cherryBoost: 20, lemonBoost: 20, starBoost: 20, sevenBoost: 20, universalMultiplier: 2, spinsRemaining: 3 } },
  { id: 69, name: "Conservative Play", description: "+1% all, 50% insurance (15 spins)", cost: 2000, type: "special", effect: { cherryBoost: 1, lemonBoost: 1, starBoost: 1, sevenBoost: 1, insurance: 50, spinsRemaining: 15 } },
  { id: 70, name: "Aggressive Play", description: "+15% all, 3x payout (1 spin)", cost: 8000, type: "special", effect: { cherryBoost: 15, lemonBoost: 15, starBoost: 15, sevenBoost: 15, universalMultiplier: 3, spinsRemaining: 1 } },
  { id: 71, name: "Cherry Specialist", description: "+25% Cherry, 4x Cherry payout (3 spins)", cost: 4000, type: "special", effect: { cherryBoost: 25, cherryMultiplier: 4, spinsRemaining: 3 } },
  { id: 72, name: "Lemon Specialist", description: "+30% Lemon, 4x Lemon payout (3 spins)", cost: 7000, type: "special", effect: { lemonBoost: 30, lemonMultiplier: 4, spinsRemaining: 3 } },
  { id: 73, name: "Star Specialist", description: "+35% Star, 4x Star payout (3 spins)", cost: 12000, type: "special", effect: { starBoost: 35, starMultiplier: 4, spinsRemaining: 3 } },
  { id: 74, name: "Seven Specialist", description: "+20% Seven, 5x Seven payout (2 spins)", cost: 18000, type: "special", effect: { sevenBoost: 20, sevenMultiplier: 5, spinsRemaining: 2 } },
  { id: 75, name: "Jackpot Hunter", description: "+10% all, 2x BAR payout (5 spins)", cost: 10000, type: "special", effect: { cherryBoost: 10, lemonBoost: 10, starBoost: 10, sevenBoost: 10, barMultiplier: 2, spinsRemaining: 5 } },
  { id: 76, name: "Lucky Streak", description: "+5% all, 1.5x all, 25% insurance (7 spins)", cost: 5000, type: "special", effect: { cherryBoost: 5, lemonBoost: 5, starBoost: 5, sevenBoost: 5, universalMultiplier: 1.5, insurance: 25, spinsRemaining: 7 } },
  { id: 77, name: "Beginner's Luck", description: "+8% all, 2x all (3 spins)", cost: 3000, type: "special", effect: { cherryBoost: 8, lemonBoost: 8, starBoost: 8, sevenBoost: 8, universalMultiplier: 2, spinsRemaining: 3 } },
  { id: 78, name: "Pro Gambler", description: "+12% all, 2.5x all (3 spins)", cost: 8000, type: "special", effect: { cherryBoost: 12, lemonBoost: 12, starBoost: 12, sevenBoost: 12, universalMultiplier: 2.5, spinsRemaining: 3 } },
  { id: 79, name: "Master Gambler", description: "+15% all, 3x all, 50% insurance (2 spins)", cost: 15000, type: "special", effect: { cherryBoost: 15, lemonBoost: 15, starBoost: 15, sevenBoost: 15, universalMultiplier: 3, insurance: 50, spinsRemaining: 2 } },
  { id: 80, name: "God Mode", description: "+20% all, 5x all, 75% insurance (1 spin)", cost: 30000, type: "special", effect: { cherryBoost: 20, lemonBoost: 20, starBoost: 20, sevenBoost: 20, universalMultiplier: 5, insurance: 75, spinsRemaining: 1 } },

  // TEMPORARY BUFFS (81-100) - Duration-based effects
  { id: 81, name: "Marathon Cherry", description: "+2% Cherry (50 spins)", cost: 3000, type: "temporary", effect: { cherryBoost: 2, spinsRemaining: 50 } },
  { id: 82, name: "Marathon Lemon", description: "+3% Lemon (40 spins)", cost: 5000, type: "temporary", effect: { lemonBoost: 3, spinsRemaining: 40 } },
  { id: 83, name: "Marathon Star", description: "+4% Star (30 spins)", cost: 8000, type: "temporary", effect: { starBoost: 4, spinsRemaining: 30 } },
  { id: 84, name: "Marathon Seven", description: "+2% Seven (25 spins)", cost: 10000, type: "temporary", effect: { sevenBoost: 2, spinsRemaining: 25 } },
  { id: 85, name: "Endurance Boost", description: "1.2x all wins (50 spins)", cost: 6000, type: "temporary", effect: { universalMultiplier: 1.2, spinsRemaining: 50 } },
  { id: 86, name: "Long Haul", description: "+1% all (100 spins)", cost: 8000, type: "temporary", effect: { cherryBoost: 1, lemonBoost: 1, starBoost: 1, sevenBoost: 1, spinsRemaining: 100 } },
  { id: 87, name: "Extended Safety", description: "30% insurance (30 spins)", cost: 4000, type: "temporary", effect: { insurance: 30, spinsRemaining: 30 } },
  { id: 88, name: "Sustained Luck", description: "+4% all, 1.3x all (20 spins)", cost: 7000, type: "temporary", effect: { cherryBoost: 4, lemonBoost: 4, starBoost: 4, sevenBoost: 4, universalMultiplier: 1.3, spinsRemaining: 20 } },
  { id: 89, name: "Power Hour", description: "+10% all, 2x all (10 spins)", cost: 10000, type: "temporary", effect: { cherryBoost: 10, lemonBoost: 10, starBoost: 10, sevenBoost: 10, universalMultiplier: 2, spinsRemaining: 10 } },
  { id: 90, name: "Quick Burst", description: "+30% all, 3x all (2 spins)", cost: 8000, type: "temporary", effect: { cherryBoost: 30, lemonBoost: 30, starBoost: 30, sevenBoost: 30, universalMultiplier: 3, spinsRemaining: 2 } },
  { id: 91, name: "Gradual Build", description: "+1% all per spin (10 spins)", cost: 5000, type: "temporary", effect: { cherryBoost: 1, lemonBoost: 1, starBoost: 1, sevenBoost: 1, spinsRemaining: 10 } },
  { id: 92, name: "Steady Wins", description: "1.1x all (100 spins)", cost: 5000, type: "temporary", effect: { universalMultiplier: 1.1, spinsRemaining: 100 } },
  { id: 93, name: "Patient Player", description: "+2% all, 20% insurance (40 spins)", cost: 6000, type: "temporary", effect: { cherryBoost: 2, lemonBoost: 2, starBoost: 2, sevenBoost: 2, insurance: 20, spinsRemaining: 40 } },
  { id: 94, name: "Grinder's Edge", description: "+3% all, 1.2x all (30 spins)", cost: 7000, type: "temporary", effect: { cherryBoost: 3, lemonBoost: 3, starBoost: 3, sevenBoost: 3, universalMultiplier: 1.2, spinsRemaining: 30 } },
  { id: 95, name: "Session Boost", description: "+5% all, 1.5x all (15 spins)", cost: 8000, type: "temporary", effect: { cherryBoost: 5, lemonBoost: 5, starBoost: 5, sevenBoost: 5, universalMultiplier: 1.5, spinsRemaining: 15 } },
  { id: 96, name: "Weekend Warrior", description: "+8% all, 2x all, 30% insurance (12 spins)", cost: 12000, type: "temporary", effect: { cherryBoost: 8, lemonBoost: 8, starBoost: 8, sevenBoost: 8, universalMultiplier: 2, insurance: 30, spinsRemaining: 12 } },
  { id: 97, name: "VIP Treatment", description: "+10% all, 2.5x all, 50% insurance (8 spins)", cost: 18000, type: "temporary", effect: { cherryBoost: 10, lemonBoost: 10, starBoost: 10, sevenBoost: 10, universalMultiplier: 2.5, insurance: 50, spinsRemaining: 8 } },
  { id: 98, name: "Whale Mode", description: "+15% all, 3x all, 60% insurance (5 spins)", cost: 25000, type: "temporary", effect: { cherryBoost: 15, lemonBoost: 15, starBoost: 15, sevenBoost: 15, universalMultiplier: 3, insurance: 60, spinsRemaining: 5 } },
  { id: 99, name: "Ultimate Power", description: "+25% all, 4x all, 75% insurance (3 spins)", cost: 40000, type: "temporary", effect: { cherryBoost: 25, lemonBoost: 25, starBoost: 25, sevenBoost: 25, universalMultiplier: 4, insurance: 75, spinsRemaining: 3 } },
  { id: 100, name: "Legendary Luck", description: "+50% all, 10x all, 90% insurance (1 spin)", cost: 100000, type: "temporary", effect: { cherryBoost: 50, lemonBoost: 50, starBoost: 50, sevenBoost: 50, universalMultiplier: 10, insurance: 90, spinsRemaining: 1 } },
];

// Helper function to get random upgrades
export function getRandomUpgrades(count: number, excludeIds: number[] = []): Upgrade[] {
  const available = UPGRADES.filter(u => !excludeIds.includes(u.id));
  const shuffled = available.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Helper function to get upgrade by ID
export function getUpgradeById(id: number): Upgrade | undefined {
  return UPGRADES.find(u => u.id === id);
}
