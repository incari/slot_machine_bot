import { SymbolSlot, ActiveUpgrade, UpgradeEffect } from "./types";
import { getUpgradeById } from "./upgrades";
import { getLevelBonus } from "./levels";

export const symbols: SymbolSlot[] = [
  { emoji: "🍒", multiplier: 4 },   // Common (1/8 win rate) - 50% return
  { emoji: "🍋", multiplier: 20 },  // Uncommon (1/125) - 16% return
  { emoji: "⭐", multiplier: 40 },  // Rare (1/296) - 13.6% return
  { emoji: "🎰", multiplier: 150 }, // Very Rare (1/8000) - 1.9% return
  { emoji: "7️⃣", multiplier: 0 },    // Reel 1 Special (Jackpot)
  { emoji: "7️⃣", multiplier: 0 },    // Reel 2 Special (Jackpot)
  { emoji: "7️⃣", multiplier: 0 },    // Reel 3 Special (Jackpot)
];

// Helper to create strips with all symbols
// 20-item reel for better distribution control
const createStrip = (specialSymbol: SymbolSlot, boosts: { cherry?: number, lemon?: number, star?: number, seven?: number } = {}): SymbolSlot[] => {
  const baseDistribution = {
    cherry: 10, // 50%
    lemon: 4,   // 20%
    star: 3,    // 15%
    seven: 2,   // 10%
    special: 1, // %
  };
  
  // Apply probability boosts (convert % to count adjustments)
  const cherryCount = Math.max(1, Math.round(baseDistribution.cherry * (1 + (boosts.cherry || 0) / 100)));
  const lemonCount = Math.max(1, Math.round(baseDistribution.lemon * (1 + (boosts.lemon || 0) / 100)));
  const starCount = Math.max(1, Math.round(baseDistribution.star * (1 + (boosts.star || 0) / 100)));
  const sevenCount = Math.max(1, Math.round(baseDistribution.seven * (1 + (boosts.seven || 0) / 100)));
  
  const strip: SymbolSlot[] = [];
  
  for (let i = 0; i < cherryCount; i++) strip.push(symbols[0]);
  for (let i = 0; i < lemonCount; i++) strip.push(symbols[1]);
  for (let i = 0; i < starCount; i++) strip.push(symbols[2]);
  for (let i = 0; i < sevenCount; i++) strip.push(symbols[3]);
  for (let i = 0; i < baseDistribution.special; i++) strip.push(specialSymbol);
  
  return strip;
};

export function spinSlots(activeUpgrades: ActiveUpgrade[] = []): SymbolSlot[] {
  // Aggregate all upgrade effects
  const totalBoosts = {
    cherry: 0,
    lemon: 0,
    star: 0,
    seven: 0,
  };
  
  let guarantee: string | undefined;
  
  activeUpgrades.forEach(au => {
    if (!au.spinsRemaining || au.spinsRemaining <= 0) return;
    
    const upgrade = getUpgradeById(au.upgradeId);
    if (!upgrade) return;
    
    const effect = upgrade.effect;
    if (effect.cherryBoost) totalBoosts.cherry += effect.cherryBoost;
    if (effect.lemonBoost) totalBoosts.lemon += effect.lemonBoost;
    if (effect.starBoost) totalBoosts.star += effect.starBoost;
    if (effect.sevenBoost) totalBoosts.seven += effect.sevenBoost;
    if (effect.guarantee) guarantee = effect.guarantee;
  });
  
  // If there's a guarantee, force that symbol
  if (guarantee) {
    const guaranteedSymbol = symbols.find(s => s.emoji.includes(guarantee === "cherry" ? "🍒" : guarantee === "lemon" ? "🍋" : guarantee === "star" ? "⭐" : ""));
    if (guaranteedSymbol) {
      return [guaranteedSymbol, guaranteedSymbol, guaranteedSymbol];
    }
  }
  
  // Create reels with boosts
  const reel1 = createStrip(symbols[4], totalBoosts);
  const reel2 = createStrip(symbols[5], totalBoosts);
  const reel3 = createStrip(symbols[6], totalBoosts);
  
  return [
    reel1[Math.floor(Math.random() * reel1.length)],
    reel2[Math.floor(Math.random() * reel2.length)],
    reel3[Math.floor(Math.random() * reel3.length)],
  ];
}



export function calculateReward(bet: number, result: SymbolSlot[], activeUpgrades: ActiveUpgrade[] = [], level: number = 1): number {
  const [a, b, c] = result;
  
  // Aggregate multiplier effects
  let totalMultiplier = 1;
  const symbolMultipliers: Record<string, number> = {};
  
  // Apply level bonus
  totalMultiplier *= getLevelBonus(level);
  
  activeUpgrades.forEach(au => {
    if (!au.spinsRemaining || au.spinsRemaining <= 0) return;
    
    const upgrade = getUpgradeById(au.upgradeId);
    if (!upgrade) return;
    
    const effect = upgrade.effect;
    if (effect.universalMultiplier) totalMultiplier *= effect.universalMultiplier;
    if (effect.cherryMultiplier) symbolMultipliers["🍒"] = (symbolMultipliers["🍒"] || 1) * effect.cherryMultiplier;
    if (effect.lemonMultiplier) symbolMultipliers["🍋"] = (symbolMultipliers["🍋"] || 1) * effect.lemonMultiplier;
    if (effect.starMultiplier) symbolMultipliers["⭐"] = (symbolMultipliers["⭐"] || 1) * effect.starMultiplier;
    if (effect.sevenMultiplier) symbolMultipliers["🎰"] = (symbolMultipliers["🎰"] || 1) * effect.sevenMultiplier; // "Seven" upgrade now applies to "Slot" symbol
    if (effect.barMultiplier) symbolMultipliers["BAR"] = (symbolMultipliers["BAR"] || 1) * effect.barMultiplier;
  });

  // Special Jackpot: 7️⃣ 7️⃣ 7️⃣
  if (a.emoji === "7️⃣" && b.emoji === "7️⃣" && c.emoji === "7️⃣") {
    // Returns 0 here because the Global Jackpot logic in bot.ts handles the payout
    return 0; 
  }

  // Standard 3-of-a-kind
  if (a.emoji === b.emoji && b.emoji === c.emoji) {
    const symbolMultiplier = symbolMultipliers[a.emoji] || 1;
    return Math.floor(bet * a.multiplier * symbolMultiplier * totalMultiplier);
  }
  
  return 0;
}
