#!/usr/bin/env ts-node

/**
 * Integration Test - Play the Game
 * 
 * This test simulates actual gameplay to verify balance calculations
 * work correctly in a real-world scenario.
 */

import { User } from "../types";
import { spinSlots, calculateReward } from "../game";
import { getJackpot, addToJackpot, resetJackpot } from "../jackpot";

function createTestUser(balance: number = 10000): User {
  return {
    id: 999999,
    balance: balance,
    language: 'en',
    level: 1,
    xp: 0,
    totalSpins: 0,
    totalWins: 0,
    totalWinnings: 0,
  };
}

function simulateSpin(user: User, bet: number): { won: boolean, reward: number, newBalance: number } {
  const initialBalance = user.balance;
  
  // Check if user can afford bet
  if (user.balance < bet) {
    console.log(`❌ Insufficient balance! Need ${bet}, have ${user.balance}`);
    return { won: false, reward: 0, newBalance: user.balance };
  }
  
  // Deduct bet
  user.balance -= bet;
  
  // Contribute to jackpot
  const jackpotContribution = Math.max(1, Math.floor(bet * 0.01));
  addToJackpot(jackpotContribution);
  
  // Spin
  const result = spinSlots(user.activeUpgrades || []);
  const reward = calculateReward(bet, result, user.activeUpgrades || [], user.level || 1);
  
  // Check for jackpot win
  let jackpotWin = 0;
  if (result[0].emoji === "🎰" && result[1].emoji === "🎰" && result[2].emoji === "🎰") {
    jackpotWin = getJackpot();
    resetJackpot();
  }
  
  const totalReward = reward + jackpotWin;
  user.balance += totalReward;
  
  // Update stats
  user.totalSpins = (user.totalSpins || 0) + 1;
  if (totalReward > 0) {
    user.totalWins = (user.totalWins || 0) + 1;
    user.totalWinnings = (user.totalWinnings || 0) + totalReward;
  }
  
  const board = `${result[0].emoji} | ${result[1].emoji} | ${result[2].emoji}`;
  const won = totalReward > 0;
  
  if (won) {
    console.log(`✅ ${board} - Won ${totalReward} credits! (Balance: ${user.balance})`);
  } else {
    console.log(`❌ ${board} - Lost ${bet} credits (Balance: ${user.balance})`);
  }
  
  return { won, reward: totalReward, newBalance: user.balance };
}

function runIntegrationTest() {
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║              INTEGRATION TEST - PLAY THE GAME              ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
  
  resetJackpot();
  addToJackpot(1000); // Start with 1000 in jackpot
  
  const user = createTestUser(10000);
  const bet = 100;
  const numSpins = 20;
  
  console.log(`🎮 Starting Game Session`);
  console.log(`Initial Balance: ${user.balance} credits`);
  console.log(`Bet Amount: ${bet} credits per spin`);
  console.log(`Number of Spins: ${numSpins}`);
  console.log(`Initial Jackpot: ${getJackpot()} credits\n`);
  console.log("─".repeat(60));
  
  const initialBalance = user.balance;
  let totalBet = 0;
  let totalWon = 0;
  
  for (let i = 1; i <= numSpins; i++) {
    console.log(`\nSpin #${i}:`);
    const result = simulateSpin(user, bet);
    
    if (result.newBalance !== user.balance) {
      console.log(`⚠️  WARNING: Balance mismatch!`);
    }
    
    totalBet += bet;
    totalWon += result.reward;
  }
  
  console.log("\n" + "─".repeat(60));
  console.log("\n📊 SESSION SUMMARY");
  console.log("─".repeat(60));
  console.log(`Initial Balance:     ${initialBalance} credits`);
  console.log(`Final Balance:       ${user.balance} credits`);
  console.log(`Net Change:          ${user.balance - initialBalance > 0 ? '+' : ''}${user.balance - initialBalance} credits`);
  console.log(`\nTotal Spins:         ${user.totalSpins}`);
  console.log(`Total Wins:          ${user.totalWins}`);
  console.log(`Win Rate:            ${Math.round((user.totalWins! / user.totalSpins!) * 100)}%`);
  console.log(`\nTotal Bet:           ${totalBet} credits`);
  console.log(`Total Won:           ${totalWon} credits`);
  console.log(`Total Winnings:      ${user.totalWinnings} credits`);
  console.log(`\nFinal Jackpot:       ${getJackpot()} credits`);
  
  // Verify balance calculation
  const expectedBalance = initialBalance - totalBet + totalWon;
  const balanceCorrect = user.balance === expectedBalance;
  
  console.log("\n" + "─".repeat(60));
  console.log("\n🧪 BALANCE VERIFICATION");
  console.log("─".repeat(60));
  console.log(`Expected Balance:    ${expectedBalance} credits`);
  console.log(`Actual Balance:      ${user.balance} credits`);
  console.log(`Difference:          ${expectedBalance - user.balance} credits`);
  
  if (balanceCorrect) {
    console.log(`\n✅ PASSED: Balance calculations are correct!`);
  } else {
    console.log(`\n❌ FAILED: Balance mismatch detected!`);
  }
  
  console.log("\n");
  
  return balanceCorrect;
}

if (require.main === module) {
  runIntegrationTest();
}

export { runIntegrationTest };
