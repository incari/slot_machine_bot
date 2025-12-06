import { DailyGoal, User } from "./types";

const GOAL_TYPES = [
  { type: "spin_count", min: 20, max: 100, step: 10, desc: "Spin the slot machine {target} times", xpPerUnit: 0.5, creditPerUnit: 2 },
  { type: "win_count", min: 5, max: 20, step: 5, desc: "Win {target} times", xpPerUnit: 2, creditPerUnit: 5 },
  { type: "bet_total", min: 500, max: 5000, step: 500, desc: "Bet a total of {target} TON", xpPerUnit: 0.05, creditPerUnit: 0.1 },
  { type: "win_big", min: 1, max: 3, step: 1, desc: "Get {target} big wins (40x or more)", xpPerUnit: 50, creditPerUnit: 200 },
  { type: "loss_streak", min: 5, max: 10, step: 1, desc: "Lose {target} times in a row (Survivor)", xpPerUnit: 10, creditPerUnit: 50 },
] as const;

export const generateDailyGoals = (): DailyGoal[] => {
  const goals: DailyGoal[] = [];
  const usedTypes = new Set<string>();

  // Generate 3 unique goals
  while (goals.length < 3) {
    const template = GOAL_TYPES[Math.floor(Math.random() * GOAL_TYPES.length)];
    
    if (usedTypes.has(template.type)) continue;
    usedTypes.add(template.type);

    // Calculate random target
    const steps = Math.floor((template.max - template.min) / template.step);
    const target = template.min + (Math.floor(Math.random() * (steps + 1)) * template.step);

    goals.push({
      id: Math.random().toString(36).substring(7),
      type: template.type,
      target,
      current: 0,
      completed: false,
      rewardXp: Math.floor(target * template.xpPerUnit),
      rewardCredits: Math.floor(target * template.creditPerUnit),
      description: template.desc.replace("{target}", target.toString())
    });
  }

  return goals;
};

export interface GoalEvent {
  type: "spin" | "win" | "bet" | "loss";
  amount?: number; // For bet amount or win multiplier
}

export const checkGoals = (user: User, event: GoalEvent): { completed: DailyGoal[], updated: boolean } => {
  if (!user.dailyGoals) return { completed: [], updated: false };

  const completedGoals: DailyGoal[] = [];
  let updated = false;

  user.dailyGoals.forEach(goal => {
    if (goal.completed) return;

    let progressMade = false;

    switch (goal.type) {
      case "spin_count":
        if (event.type === "spin") {
          goal.current++;
          progressMade = true;
        }
        break;
      case "win_count":
        if (event.type === "win") {
          goal.current++;
          progressMade = true;
        }
        break;
      case "bet_total":
        if (event.type === "bet" && event.amount) {
          goal.current += event.amount;
          progressMade = true;
        }
        break;
      case "win_big":
        if (event.type === "win" && event.amount && event.amount >= 40) {
          goal.current++;
          progressMade = true;
        }
        break;
      case "loss_streak":
        if (event.type === "loss") {
          goal.current++;
          progressMade = true;
        } else if (event.type === "win") {
          // Reset streak on win
          goal.current = 0;
          updated = true;
        }
        break;
    }

    if (progressMade) {
      updated = true;
      if (goal.current >= goal.target) {
        goal.completed = true;
        completedGoals.push(goal);
      }
    }
  });

  return { completed: completedGoals, updated };
};
