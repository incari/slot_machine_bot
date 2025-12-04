import { User } from "./types";
import * as fs from "fs";
import * as path from "path";

const DATA_FILE = path.join(__dirname, "../users.json");
let users: Record<number, User> = {};

// Load data on startup
try {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    users = JSON.parse(data);
  }
} catch (error) {
  console.error("Error loading users:", error);
}

function saveUsers() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error saving users:", error);
  }
}

export function getUser(id: number): User {
  if (!users[id]) {
    users[id] = { id, balance: 10000 };
    saveUsers();
  }
  return users[id];
}

// Save whenever balance changes (you can call this manually or add a setter)
export function updateUser(user: User) {
    users[user.id] = user;
    saveUsers();
}
