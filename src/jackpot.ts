import * as fs from "fs";
import * as path from "path";

const DATA_FILE = path.join(__dirname, "../jackpot.json");
const SEED_AMOUNT = 1000;

interface JackpotData {
  amount: number;
}

let jackpot: JackpotData = { amount: SEED_AMOUNT };

// Load data on startup
try {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    jackpot = JSON.parse(data);
    if (typeof jackpot.amount !== 'number' || isNaN(jackpot.amount)) {
      console.error("Invalid jackpot amount, resetting to seed.");
      jackpot.amount = SEED_AMOUNT;
    }
  } else {
    console.log("Jackpot file not found, creating new one.");
    saveJackpot();
  }
} catch (error) {
  console.error("Error loading jackpot:", error);
  jackpot = { amount: SEED_AMOUNT }; // Fallback
}

function saveJackpot() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(jackpot, null, 2));
  } catch (error) {
    console.error("Error saving jackpot:", error);
  }
}

export const getJackpot = (): number => {
  return Math.floor(jackpot.amount);
};

export const addToJackpot = (amount: number) => {
  jackpot.amount += amount;
  saveJackpot();
};

export const resetJackpot = () => {
  jackpot.amount = SEED_AMOUNT;
  saveJackpot();
};
