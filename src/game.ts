import { SymbolSlot } from "./types";

export const symbols: SymbolSlot[] = [
  { emoji: "🍒", multiplier: 4 },   // Common (1/8 win rate) - 50% return
  { emoji: "🍋", multiplier: 20 },  // Uncommon (1/125) - 16% return
  { emoji: "⭐", multiplier: 40 },  // Rare (1/296) - 13.6% return
  { emoji: "7️⃣", multiplier: 150 }, // Very Rare (1/8000) - 1.9% return
  { emoji: "🇧", multiplier: 0 },    // Reel 1 Special
  { emoji: "🇦", multiplier: 0 },    // Reel 2 Special
  { emoji: "🇷", multiplier: 0 },    // Reel 3 Special
];

// Helper to create strips with all symbols
// 20-item reel for better distribution control
const createStrip = (specialSymbol: SymbolSlot): SymbolSlot[] => [
  symbols[0], symbols[0], symbols[0], symbols[0], symbols[0], symbols[0], symbols[0], symbols[0], symbols[0], symbols[0], // 10x Cherry (50%)
  symbols[1], symbols[1], symbols[1], symbols[1], // 4x Lemon (20%)
  symbols[2], symbols[2], symbols[2], // 3x Star (15%)
  symbols[3], // 1x Seven (5%)
  specialSymbol, specialSymbol, // 2x Special Letter (10%)
];

const reel1: SymbolSlot[] = createStrip(symbols[4]); // Contains B
const reel2: SymbolSlot[] = createStrip(symbols[5]); // Contains A
const reel3: SymbolSlot[] = createStrip(symbols[6]); // Contains R

export function spinSlots(): SymbolSlot[] {
  return [
    reel1[Math.floor(Math.random() * reel1.length)],
    reel2[Math.floor(Math.random() * reel2.length)],
    reel3[Math.floor(Math.random() * reel3.length)],
  ];
}

export function calculateReward(bet: number, result: SymbolSlot[]): number {
  const [a, b, c] = result;

  // Special Jackpot: B - A - R
  if (a.emoji === "🇧" && b.emoji === "🇦" && c.emoji === "🇷") {
    return bet * 100; // 100x Jackpot! (1 in 1000 chance)
  }

  // Standard 3-of-a-kind
  if (a.emoji === b.emoji && b.emoji === c.emoji) {
    return bet * a.multiplier;
  }
  
  return 0;
}
