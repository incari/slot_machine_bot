import { db } from "./database";

const SEED_AMOUNT = 1000;

// Prepared statements
const getStmt = db.prepare(`SELECT amount FROM jackpot WHERE id = 1`);
const updateStmt = db.prepare(`UPDATE jackpot SET amount = ? WHERE id = 1`);

export const getJackpot = (): number => {
  const row = getStmt.get() as { amount: number } | undefined;
  return Math.floor(row?.amount ?? SEED_AMOUNT);
};

export const addToJackpot = (amount: number) => {
  const current = getJackpot();
  updateStmt.run(current + amount);
};

export const resetJackpot = () => {
  updateStmt.run(SEED_AMOUNT);
};
