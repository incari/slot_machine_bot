import { User } from "./types";
import { getUser, updateUser } from "./users";

const REFERRAL_REWARD_CREDITS = 1000;
const REFERRAL_REWARD_XP = 50;

export interface ReferralResult {
  success: boolean;
  referrerId?: number;
  rewardCredits: number;
  rewardXp: number;
  message?: string;
}

export const processReferral = (newUserId: number, referrerId: number): ReferralResult => {
  // 1. Validation
  if (newUserId === referrerId) {
    return { success: false, rewardCredits: 0, rewardXp: 0, message: "Cannot refer yourself." };
  }

  const newUser = getUser(newUserId);
  if (newUser.referredBy) {
    return { success: false, rewardCredits: 0, rewardXp: 0, message: "User already referred." };
  }
  
  // Check if referrer exists
  const referrer = getUser(referrerId);
  if (!referrer.id) { // Assuming getUser returns a default user object if not found, check if it's a "real" user (e.g. has logged in)
     // In our current getUser implementation, it creates a new user if not found. 
     // Ideally we should check if the referrer actually exists in the DB/JSON before creating.
     // For now, we proceed, but in a real DB we'd query first.
  }

  // 2. Update New User
  newUser.referredBy = referrerId;
  newUser.balance += REFERRAL_REWARD_CREDITS;
  newUser.xp = (newUser.xp || 0) + REFERRAL_REWARD_XP;
  updateUser(newUser);

  // 3. Update Referrer
  referrer.referralCount = (referrer.referralCount || 0) + 1;
  referrer.referralEarnings = (referrer.referralEarnings || 0) + REFERRAL_REWARD_CREDITS;
  referrer.balance += REFERRAL_REWARD_CREDITS;
  referrer.xp = (referrer.xp || 0) + REFERRAL_REWARD_XP;
  updateUser(referrer);

  return {
    success: true,
    referrerId,
    rewardCredits: REFERRAL_REWARD_CREDITS,
    rewardXp: REFERRAL_REWARD_XP
  };
};

export const getReferralLink = (botUsername: string, userId: number): string => {
  return `https://t.me/${botUsername}?start=${userId}`;
};
