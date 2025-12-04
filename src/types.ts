export interface User {
  id: number;
  balance: number;
  language: string; // 'en' | 'es' | 'de' | 'it' | 'fr' | 'ru'
  lastBet?: number; // Track last bet amount for repeat button
  activeUpgrades?: ActiveUpgrade[]; // Active upgrades affecting gameplay
  shopOffers?: number[]; // Current 3 upgrade IDs in shop
}

export interface SymbolSlot {
  emoji: string;
  multiplier: number;
}

export interface Upgrade {
  id: number;
  name: string;
  description: string;
  cost: number;
  type: 'probability' | 'multiplier' | 'special' | 'temporary';
  effect: UpgradeEffect;
}

export interface UpgradeEffect {
  // Probability modifications (additive %)
  cherryBoost?: number;
  lemonBoost?: number;
  starBoost?: number;
  sevenBoost?: number;
  
  // Multiplier modifications (multiplicative)
  cherryMultiplier?: number;
  lemonMultiplier?: number;
  starMultiplier?: number;
  sevenMultiplier?: number;
  barMultiplier?: number;
  universalMultiplier?: number; // Applies to all wins
  
  // Special effects
  insurance?: number; // Refund % on loss
  reroll?: boolean; // Can reroll one reel
  guarantee?: string; // Guarantee specific symbol
  
  // Duration
  spinsRemaining?: number; // For temporary upgrades
  permanent?: boolean; // For permanent upgrades
}

export interface ActiveUpgrade {
  upgradeId: number;
  spinsRemaining?: number;
  purchasedAt: number; // Timestamp
}
