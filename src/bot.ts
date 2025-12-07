import { Telegraf } from "telegraf";
import { getUser, updateUser, getAllUsers } from "./users";
import { spinSlots, calculateReward } from "./game";
import { t, Language } from "./translations";
import { setUserLanguage } from "./users";
import { getRandomUpgrades, getUpgradeById } from "./upgrades";
import { ActiveUpgrade } from "./types";
import { processDailyLogin, getDailyBonusEmoji } from "./dailyBonus";
import { calculateLevel, getLevelProgress, getLevelTitle, getLevelBonus } from "./levels";
import { checkGoals } from "./goals";
import { processReferral, getReferralLink } from "./referrals";
import { getJackpot, addToJackpot, resetJackpot } from "./jackpot";

require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN!);

// Helper for delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

bot.start(async (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;

  // Show comprehensive welcome guide
  await ctx.reply(t(lang, "welcome_guide"), {
    parse_mode: "Markdown",
  });

  // Process daily login bonus
  const dailyResult = processDailyLogin(user);

  if (dailyResult.claimed) {
    // Award the bonus
    user.balance += dailyResult.bonus;
    updateUser(user);

    const emoji = getDailyBonusEmoji(dailyResult.consecutiveDays);

    // Show bonus message
    if (dailyResult.streakBroken) {
      await ctx.reply(
        t(lang, "daily_bonus_streak_broken", {
          emoji,
          bonus: dailyResult.bonus,
          balance: user.balance,
        }),
        { parse_mode: "Markdown" }
      );
    } else {
      await ctx.reply(
        t(lang, "daily_bonus_claimed", {
          emoji,
          bonus: dailyResult.bonus,
          streak: dailyResult.consecutiveDays,
          balance: user.balance,
        }),
        { parse_mode: "Markdown" }
      );
    }
  } else if (dailyResult.alreadyClaimed) {
    // Already claimed today
    await ctx.reply(
      t(lang, "daily_bonus_already_claimed", {
        streak: dailyResult.consecutiveDays,
        balance: user.balance,
      }),
      { parse_mode: "Markdown" }
    );
  }

  // Show welcome message with spin buttons
  ctx.reply(t(lang, "start_welcome", { balance: user.balance }), {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "💰 10 Credits", callback_data: "spin_10" },
          { text: "💰 50 Credits", callback_data: "spin_50" },
          { text: "💰 100 Credits", callback_data: "spin_100" },
        ],
      ],
    },
  });

  // Check for referral payload
  // @ts-ignore - startPayload exists on Telegraf context but might be missing in types
  const payload = ctx.startPayload || ctx.payload; 
  if (payload && !isNaN(parseInt(payload))) {
    const referrerId = parseInt(payload);
    const result = processReferral(user.id, referrerId);
    
    if (result.success) {
      // Notify new user
      ctx.reply(`🎉 *Welcome Bonus!* 🎉\nYou were invited by a friend!\nReceived: *${result.rewardCredits} Credits* + *${result.rewardXp} XP*`, { parse_mode: "Markdown" });
      
      // Notify referrer
      bot.telegram.sendMessage(referrerId, `🤝 *New Referral!* 🤝\nA friend just joined via your link!\nReceived: *${result.rewardCredits} Credits* + *${result.rewardXp} XP*`, { parse_mode: "Markdown" });
    }
  }
});

bot.help((ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;

  ctx.reply(
    t(lang, "help_title") +
      t(lang, "help_start") +
      t(lang, "help_balance") +
      t(lang, "help_buy") +
      t(lang, "help_info") +
      t(lang, "help_language") +
      t(lang, "help_daily") +
      t(lang, "help_spin") +
      t(lang, "help_help"),
    { parse_mode: "Markdown" }
  );
});

// Set commands for each language
const commandTranslations = {
  en: [
    { command: "start", description: "Start & play" },
    { command: "spin", description: "Spin the slots" },
    { command: "shop", description: "Upgrade shop" },
    { command: "buy", description: "Buy credits" },
    { command: "invite", description: "Invite friends" },
    { command: "game", description: "Game info & stats" },
    { command: "account", description: "Account & rewards" },
    { command: "settings", description: "Settings & help" },
  ],
  es: [
    { command: "start", description: "Iniciar y jugar" },
    { command: "spin", description: "Girar tragamonedas" },
    { command: "shop", description: "Tienda de mejoras" },
    { command: "buy", description: "Comprar créditos" },
    { command: "invite", description: "Invitar amigos" },
    { command: "game", description: "Info y estadísticas" },
    { command: "account", description: "Cuenta y recompensas" },
    { command: "settings", description: "Ajustes y ayuda" },
  ],
  de: [
    { command: "start", description: "Starten & spielen" },
    { command: "spin", description: "Spielautomat drehen" },
    { command: "shop", description: "Upgrade-Shop" },
    { command: "buy", description: "Credits kaufen" },
    { command: "invite", description: "Freunde einladen" },
    { command: "game", description: "Spielinfo & Stats" },
    { command: "account", description: "Konto & Belohnungen" },
    { command: "settings", description: "Einstellungen & Hilfe" },
  ],
  it: [
    { command: "start", description: "Inizia e gioca" },
    { command: "spin", description: "Gira slot machine" },
    { command: "shop", description: "Negozio upgrade" },
    { command: "buy", description: "Acquista crediti" },
    { command: "invite", description: "Invita amici" },
    { command: "game", description: "Info e statistiche" },
    { command: "account", description: "Account e premi" },
    { command: "settings", description: "Impostazioni & aiuto" },
  ],
  fr: [
    { command: "start", description: "Démarrer et jouer" },
    { command: "spin", description: "Tourner la machine" },
    { command: "shop", description: "Boutique d'améliorations" },
    { command: "buy", description: "Acheter des crédits" },
    { command: "invite", description: "Inviter des amis" },
    { command: "game", description: "Info et statistiques" },
    { command: "account", description: "Compte et récompenses" },
    { command: "settings", description: "Paramètres et aide" },
  ],
  ru: [
    { command: "start", description: "Начать и играть" },
    { command: "spin", description: "Крутить автомат" },
    { command: "shop", description: "Магазин улучшений" },
    { command: "buy", description: "Купить кредиты" },
    { command: "invite", description: "Пригласить друзей" },
    { command: "game", description: "Инфо и статистика" },
    { command: "account", description: "Аккаунт и награды" },
    { command: "settings", description: "Настройки и помощь" },
  ],
};

// Set commands for each language
Object.entries(commandTranslations).forEach(([lang, commands]) => {
  bot.telegram.setMyCommands(commands, { language_code: lang });
});

// Set default (English) for users with other languages
bot.telegram.setMyCommands(commandTranslations.en);

// Language selection command
bot.command("language", (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;

  ctx.reply(t(lang, "language_select"), {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🇬🇧 English", callback_data: "lang_en" },
          { text: "🇪🇸 Español", callback_data: "lang_es" },
        ],
        [
          { text: "🇩🇪 Deutsch", callback_data: "lang_de" },
          { text: "🇮🇹 Italiano", callback_data: "lang_it" },
        ],
        [
          { text: "🇫🇷 Français", callback_data: "lang_fr" },
          { text: "🇷🇺 Русский", callback_data: "lang_ru" },
        ],
      ],
    },
  });
});

// Language selection handlers
const languages: Record<string, Language> = {
  lang_en: "en",
  lang_es: "es",
  lang_de: "de",
  lang_it: "it",
  lang_fr: "fr",
  lang_ru: "ru",
};

Object.keys(languages).forEach((langKey) => {
  bot.action(langKey, async (ctx) => {
    const newLang = languages[langKey];
    setUserLanguage(ctx.from!.id, newLang);

    await ctx.editMessageText(t(newLang, "language_changed"), {
      parse_mode: "Markdown",
    });
    ctx.answerCbQuery();
  });
});

// Buy credits command
bot.command("buy", (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;

  ctx.reply(t(lang, "buy_title") + t(lang, "buy_packages"), {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: t(lang, "buy_button_10"), callback_data: "buy_10" }],
        [{ text: t(lang, "buy_button_100"), callback_data: "buy_100" }],
        [{ text: t(lang, "buy_button_500"), callback_data: "buy_500" }],
        [{ text: t(lang, "buy_button_1000"), callback_data: "buy_1000" }],
      ],
    },
  });
});

// Info command - show game odds
bot.command("info", (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;

  ctx.reply(
    t(lang, "info_title") +
      t(lang, "info_combinations") +
      t(lang, "info_cherry") +
      t(lang, "info_lemon") +
      t(lang, "info_star") +
      t(lang, "info_seven") +
      t(lang, "info_jackpot"),
    { parse_mode: "Markdown" }
  );
});

bot.command("balance", (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;
  ctx.reply(t(lang, "balance_current", { balance: user.balance }));
});

// Daily command - show daily login status
bot.command("daily", (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;

  const { canClaimDailyBonus, getDailyBonusAmount } = require("./dailyBonus");

  const streak = user.consecutiveDays || 0;
  const total = user.totalLoginDays || 0;
  const nextBonus = getDailyBonusAmount(streak + 1);
  const canClaim = canClaimDailyBonus(user);

  const status = canClaim
    ? t(lang, "daily_status_available")
    : t(lang, "daily_status_claimed");

  ctx.reply(
    t(lang, "daily_status", {
      streak,
      total,
      balance: user.balance,
      nextBonus,
      status,
    }),
    { parse_mode: "Markdown" }
  );
});

// Goals command
bot.command("goals", (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;

  if (!user.dailyGoals || user.dailyGoals.length === 0) {
    // Should have been generated on login, but just in case
    const { generateDailyGoals } = require("./goals");
    user.dailyGoals = generateDailyGoals();
    updateUser(user);
  }

  let message = "🎯 *DAILY GOALS* 🎯\n\n";
  
  user.dailyGoals!.forEach(goal => {
    const status = goal.completed ? "✅" : "⬜";
    const progress = Math.min(100, Math.floor((goal.current / goal.target) * 100));
    const progressBar = "▓".repeat(Math.floor(progress / 10)) + "░".repeat(10 - Math.floor(progress / 10));
    
    message += `${status} *${goal.description}*\n`;
    if (goal.completed) {
      message += `   🎉 Completed! (+${goal.rewardXp} XP, +${goal.rewardCredits} Credits)\n\n`;
    } else {
      message += `   ${progressBar} ${goal.current}/${goal.target}\n`;
      message += `   🎁 Reward: ${goal.rewardXp} XP, ${goal.rewardCredits} Credits\n\n`;
    }
  });

  ctx.reply(message, { parse_mode: "Markdown" });
});

// Profile command
bot.command("profile", (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;
  
  const level = user.level || 1;
  const xp = user.activeUpgrades ? (user as any).xp || 0 : 0; // Fix type issue temporarily
  const title = getLevelTitle(level);
  const progress = getLevelProgress(user.xp || 0, level);
  const bonus = Math.round((getLevelBonus(level) - 1) * 100);
  
  const progressBar = "▓".repeat(Math.floor(progress.percentage / 10)) + "░".repeat(10 - Math.floor(progress.percentage / 10));

  let message = `👤 *USER PROFILE* 👤\n\n`;
  message += `📜 Title: *${title}*\n`;
  message += `🆙 Level: *${level}*\n`;
  message += `✨ XP: ${progress.current} / ${progress.total}\n`;
  message += `   ${progressBar} ${progress.percentage}%\n\n`;
  
  message += `💎 *Stats:*\n`;
  message += `💰 Balance: ${user.balance} Credits\n`;
  message += `🍀 Level Bonus: +${bonus}% rewards\n`;
  message += `🔥 Login Streak: ${user.consecutiveDays || 0} days\n`;
  message += `📅 Total Days: ${user.totalLoginDays || 0} days\n`;

  ctx.reply(message, { parse_mode: "Markdown" });
});

// Game command - Game info & stats
bot.command("game", (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;
  const currentJackpot = getJackpot();
  
  let message = `🎮 *GAME INFO & STATS* 🎮\n\n`;
  message += `🎰 *Global Jackpot:* ${currentJackpot} Credits\n\n`;
  message += `📊 *Your Stats:*\n`;
  message += `🎲 Total Spins: ${user.totalSpins || 0}\n`;
  message += `🏆 Total Wins: ${user.totalWins || 0}\n`;
  message += `💰 Total Winnings: ${user.totalWinnings || 0} Credits\n`;
  message += `📈 Win Rate: ${user.totalSpins ? Math.round((user.totalWins || 0) / user.totalSpins * 100) : 0}%\n\n`;
  message += `*Quick Actions:*`;

  ctx.reply(message, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "📊 View Odds", callback_data: "show_info" },
          { text: "🎰 Jackpot Info", callback_data: "show_jackpot" },
        ],
      ],
    },
  });
});

// Account command - Account & rewards
bot.command("account", (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;
  
  const level = user.level || 1;
  const title = getLevelTitle(level);
  const progress = getLevelProgress(user.xp || 0, level);
  const bonus = Math.round((getLevelBonus(level) - 1) * 100);
  
  let message = `👤 *ACCOUNT & REWARDS* 👤\n\n`;
  message += `💰 Balance: *${user.balance} Credits*\n`;
  message += `🆙 Level: *${level}* (${title})\n`;
  message += `✨ XP: ${progress.current} / ${progress.total}\n`;
  message += `🍀 Level Bonus: +${bonus}% rewards\n\n`;
  message += `🔥 Login Streak: *${user.consecutiveDays || 0} days*\n`;
  message += `📅 Total Login Days: ${user.totalLoginDays || 0}\n\n`;
  message += `*Quick Actions:*`;

  ctx.reply(message, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "👤 Full Profile", callback_data: "show_profile" },
          { text: "🎯 Daily Goals", callback_data: "show_goals" },
        ],
        [
          { text: "🔥 Daily Bonus", callback_data: "show_daily" },
          { text: "🤝 Invite Friends", callback_data: "show_invite" },
        ],
      ],
    },
  });
});

// Settings command - Settings & help
bot.command("settings", (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;
  
  let message = `⚙️ *SETTINGS & HELP* ⚙️\n\n`;
  message += `🌍 Current Language: *${lang.toUpperCase()}*\n`;
  message += `💰 Balance: ${user.balance} Credits\n\n`;
  message += `*Quick Actions:*`;

  ctx.reply(message, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🌍 Change Language", callback_data: "show_language" },
          { text: "❓ Help", callback_data: "show_help" },
        ],
        [
          { text: "📊 View Balance", callback_data: "show_balance" },
        ],
      ],
    },
  });
});


// Cheat command for testing (Admin only)
bot.command("cheat", (ctx) => {
  const adminId = parseInt(process.env.ADMIN_ID || "0");
  if (ctx.from!.id !== adminId) return;

  const user = getUser(ctx.from!.id);
  user.balance += 10000;
  updateUser(user);
  ctx.reply(`🕵️ *CHEAT ACTIVATED*\nAdded 10,000 Credits to your balance.\nNew Balance: ${user.balance} Credits`, { parse_mode: "Markdown" });
});

// Helper to find your ID
bot.command("id", (ctx) => {
  ctx.reply(`Your ID is: \`${ctx.from!.id}\``, { parse_mode: "Markdown" });
});

// Broadcast command (Admin only)
bot.command("broadcast", async (ctx) => {
  const adminId = parseInt(process.env.ADMIN_ID || "0");
  if (ctx.from!.id !== adminId) {
    return ctx.reply("❌ This command is only available to admins.");
  }

  // Get the message to broadcast (everything after /broadcast)
  const message = ctx.message.text.replace("/broadcast", "").trim();
  
  if (!message) {
    return ctx.reply(
      `📢 *BROADCAST COMMAND* 📢\n\n` +
      `Usage: \`/broadcast Your message here\`\n\n` +
      `This will send your message to all bot users.\n` +
      `Use Markdown formatting if needed.`,
      { parse_mode: "Markdown" }
    );
  }

  const users = getAllUsers();
  const totalUsers = users.length;
  
  await ctx.reply(
    `📢 Starting broadcast to ${totalUsers} users...\n` +
    `This may take a while. I'll notify you when it's done.`
  );

  let successCount = 0;
  let failCount = 0;
  const failedUsers: number[] = [];

  // Send to all users with rate limiting
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    
    try {
      await ctx.telegram.sendMessage(user.id, message, { parse_mode: "Markdown" });
      successCount++;
      
      // Rate limiting: wait 50ms between messages to avoid hitting Telegram limits
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Progress update every 50 users
      if ((i + 1) % 50 === 0) {
        await ctx.reply(`Progress: ${i + 1}/${totalUsers} users...`);
      }
    } catch (error) {
      failCount++;
      failedUsers.push(user.id);
      console.error(`Failed to send to user ${user.id}:`, error);
    }
  }

  // Final report
  let report = `✅ *BROADCAST COMPLETE* ✅\n\n`;
  report += `📊 *Results:*\n`;
  report += `✅ Successful: ${successCount}\n`;
  report += `❌ Failed: ${failCount}\n`;
  report += `👥 Total: ${totalUsers}\n`;
  
  if (failedUsers.length > 0 && failedUsers.length <= 10) {
    report += `\n⚠️ Failed user IDs: ${failedUsers.join(", ")}`;
  } else if (failedUsers.length > 10) {
    report += `\n⚠️ ${failedUsers.length} users failed (likely blocked the bot)`;
  }

  await ctx.reply(report, { parse_mode: "Markdown" });
});


// Shop command - show 3 random upgrades
bot.command("shop", (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;

  // Generate 3 random upgrades if not already set
  if (!user.shopOffers || user.shopOffers.length === 0) {
    const randomUpgrades = getRandomUpgrades(3);
    user.shopOffers = randomUpgrades.map((u) => u.id);
    updateUser(user);
  }

  const offers = user.shopOffers
    .map((id) => getUpgradeById(id)!)
    .filter(Boolean);

  let shopMessage = "🏪 *UPGRADE SHOP* 🏪\n\n";
  shopMessage += `💰 Your Balance: ${user.balance} Credits\n\n`;

  if (user.activeUpgrades && user.activeUpgrades.length > 0) {
    shopMessage += "✨ *Active Upgrades:*\n";
    user.activeUpgrades.forEach((au) => {
      const upgrade = getUpgradeById(au.upgradeId);
      if (upgrade && au.spinsRemaining) {
        shopMessage += `• ${upgrade.name} (${au.spinsRemaining} spins left)\n`;
      }
    });
    shopMessage += "\n";
  }

  shopMessage += "*Available Upgrades:*\n\n";

  const buttons = offers.map((upgrade, index) => {
    const emoji = index === 0 ? "1️⃣" : index === 1 ? "2️⃣" : "3️⃣";
    shopMessage += `${emoji} *${upgrade.name}*\n`;
    shopMessage += `   ${upgrade.description}\n`;
    shopMessage += `   💵 Cost: ${upgrade.cost} Credits\n\n`;

    return [
      {
        text: `${emoji} Buy ${upgrade.cost} Credits`,
        callback_data: `buy_upgrade_${upgrade.id}`,
      },
    ];
  });

  // Add refresh button
  buttons.push([
    { text: "🔄 Refresh (1000 Credits)", callback_data: "refresh_shop" },
  ]);

  ctx.reply(shopMessage, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: buttons,
    },
  });
});

// Refresh shop handler
bot.action("refresh_shop", async (ctx) => {
  const user = getUser(ctx.from!.id);
  const REFRESH_COST = 1000;

  if (user.balance < REFRESH_COST) {
    ctx.answerCbQuery(`❌ Not enough balance! Need ${REFRESH_COST} Credits`);
    return;
  }

  // Deduct refresh cost
  user.balance -= REFRESH_COST;

  // Generate new random upgrades
  const randomUpgrades = getRandomUpgrades(3);
  user.shopOffers = randomUpgrades.map((u) => u.id);
  updateUser(user);

  const offers = user.shopOffers
    .map((id) => getUpgradeById(id)!)
    .filter(Boolean);

  let shopMessage = "🏪 *UPGRADE SHOP* 🏪\n\n";
  shopMessage += `💰 Your Balance: ${user.balance} Credits\n\n`;

  if (user.activeUpgrades && user.activeUpgrades.length > 0) {
    shopMessage += "✨ *Active Upgrades:*\n";
    user.activeUpgrades.forEach((au) => {
      const upgrade = getUpgradeById(au.upgradeId);
      if (upgrade && au.spinsRemaining) {
        shopMessage += `• ${upgrade.name} (${au.spinsRemaining} spins left)\n`;
      }
    });
    shopMessage += "\n";
  }

  shopMessage += "*Available Upgrades:*\n\n";

  const buttons = offers.map((upgrade, index) => {
    const emoji = index === 0 ? "1️⃣" : index === 1 ? "2️⃣" : "3️⃣";
    shopMessage += `${emoji} *${upgrade.name}*\n`;
    shopMessage += `   ${upgrade.description}\n`;
    shopMessage += `   💵 Cost: ${upgrade.cost} Credits\n\n`;

    return [
      {
        text: `${emoji} Buy ${upgrade.cost} Credits`,
        callback_data: `buy_upgrade_${upgrade.id}`,
      },
    ];
  });

  buttons.push([
    { text: "🔄 Refresh (1000 Credits)", callback_data: "refresh_shop" },
  ]);

  await ctx.editMessageText(shopMessage, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: buttons,
    },
  });

  ctx.answerCbQuery("✅ Shop refreshed!");
});

// Buy upgrade handler
bot.action(/^buy_upgrade_(\d+)$/, async (ctx) => {
  const upgradeId = parseInt(ctx.match[1]);
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;
  const upgrade = getUpgradeById(upgradeId);

  if (!upgrade) {
    ctx.answerCbQuery("❌ Upgrade not found!");
    return;
  }

  if (user.balance < upgrade.cost) {
    ctx.answerCbQuery(`❌ Not enough balance! Need ${upgrade.cost} Credits`);
    return;
  }

  // Deduct cost
  user.balance -= upgrade.cost;

  // Add to active upgrades
  if (!user.activeUpgrades) {
    user.activeUpgrades = [];
  }

  const activeUpgrade: ActiveUpgrade = {
    upgradeId: upgrade.id,
    spinsRemaining: upgrade.effect.spinsRemaining,
    purchasedAt: Date.now(),
  };

  user.activeUpgrades.push(activeUpgrade);
  updateUser(user);

  ctx.answerCbQuery(`✅ Purchased ${upgrade.name}!`);

  // Show purchase confirmation with bet buttons
  let confirmMessage = `✅ *Purchase Successful!*\n\n`;
  confirmMessage += `🎁 *${upgrade.name}*\n`;
  confirmMessage += `${upgrade.description}\n\n`;
  confirmMessage += `💰 New Balance: ${user.balance} Credits\n\n`;

  if (user.activeUpgrades && user.activeUpgrades.length > 0) {
    confirmMessage += "✨ *Active Upgrades:*\n";
    user.activeUpgrades.forEach((au) => {
      const upg = getUpgradeById(au.upgradeId);
      if (upg && au.spinsRemaining) {
        confirmMessage += `• ${upg.name} (${au.spinsRemaining} spins left)\n`;
      }
    });
    confirmMessage += "\n";
  }

  confirmMessage += "*Ready to spin?*";

  await ctx.editMessageText(confirmMessage, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: t(lang, "button_spin_10"), callback_data: "spin_10" },
          { text: t(lang, "button_spin_50"), callback_data: "spin_50" },
          { text: t(lang, "button_spin_100"), callback_data: "spin_100" },
        ],
      ],
    },
  });
});

// Reusable spin logic
const executeSpin = async (ctx: any, bet: number) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;

  // Check for spin lock to prevent race conditions
  // Auto-release lock if it's been more than 10 seconds (stuck lock protection)
  if (user.isSpinning) {
    const lockTime = user.spinLockTime || 0;
    const now = Date.now();
    
    if (now - lockTime > 10000) {
      // Lock is stuck, release it
      user.isSpinning = false;
      updateUser(user);
    } else {
      // Lock is active, reject the spin
      if (ctx.callbackQuery) {
        return ctx.answerCbQuery("⏳ Please wait...");
      }
      return null;
    }
  }

  if (user.balance < bet) {
    return ctx.reply(
      t(lang, "spin_insufficient", { balance: user.balance, bet }) + "\n\n" + t(lang, "buy_title") + t(lang, "buy_packages"),
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: t(lang, "buy_button_10"), callback_data: "buy_10" }],
            [{ text: t(lang, "buy_button_100"), callback_data: "buy_100" }],
            [{ text: t(lang, "buy_button_500"), callback_data: "buy_500" }],
            [{ text: t(lang, "buy_button_1000"), callback_data: "buy_1000" }],
          ],
        },
      }
    );
  }

  // Set spin lock
  user.isSpinning = true;
  user.spinLockTime = Date.now();
  updateUser(user);

  try {
    // Animation with consistent message length to prevent flickering
    const spinningText = t(lang, "spin_spinning");

  // Build consistent button layout for animation (same as final result)
  const animationButtons = [
    [
      { text: t(lang, "button_spin_10"), callback_data: "spin_10" },
      { text: t(lang, "button_spin_50"), callback_data: "spin_50" },
      { text: t(lang, "button_spin_100"), callback_data: "spin_100" },
    ],
  ];

  // Add second row to match final layout - show current bet as the repeat button
  // After this spin completes, this bet will become the lastBet
  animationButtons.push([
    { text: `🔁 ${bet} Credits`, callback_data: `spin_${bet}` },
  ]);

  const msg = await ctx.reply(spinningText, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: animationButtons,
    },
  });

  // Animation loop - show 3 intermediate spins
  for (let i = 0; i < 3; i++) {
    await delay(150);
    const tempResult = spinSlots(user.activeUpgrades || []);
    const tempBoard = `${tempResult[0].emoji} | ${tempResult[1].emoji} | ${tempResult[2].emoji}`;
    try {
      await ctx.telegram.editMessageText(
        msg.chat.id,
        msg.message_id,
        undefined,
        t(lang, "spin_spinning").replace("❓ | ❓ | ❓", tempBoard),
        {
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: animationButtons,
          },
        }
      );
    } catch (e) {
      // Ignore errors if message is not modified
    }
  }

  await delay(200);

  const result = spinSlots(user.activeUpgrades || []);
  const reward = calculateReward(bet, result, user.activeUpgrades || [], user.level || 1);

  // Calculate insurance refund if applicable
  let insuranceRefund = 0;
  if (reward === 0 && user.activeUpgrades) {
    user.activeUpgrades.forEach((au) => {
      if (au.spinsRemaining && au.spinsRemaining > 0) {
        const upgrade = getUpgradeById(au.upgradeId);
        if (upgrade?.effect.insurance) {
          insuranceRefund = Math.max(
            insuranceRefund,
            bet * (upgrade.effect.insurance / 100)
          );
        }
      }
    });
  }

  user.balance -= bet;
  // user.balance += reward; // Removed: reward added later
  // user.balance += insuranceRefund; // Removed: insurance added later
  user.lastBet = bet; // Save last bet for repeat button

  // Consume upgrades (decrease spins remaining)
  if (user.activeUpgrades) {
    user.activeUpgrades = user.activeUpgrades
      .map((au) => ({
        ...au,
        spinsRemaining: au.spinsRemaining ? au.spinsRemaining - 1 : 0,
      }))
      .filter((au) => au.spinsRemaining && au.spinsRemaining > 0); // Remove expired upgrades
  }

  // 1. Deduct balance
  user.balance -= bet;
  
  // 2. Contribute to Jackpot (1%)
  const jackpotContribution = Math.max(1, Math.floor(bet * 0.01));
  addToJackpot(jackpotContribution);

  // 3. Spin (Already spun above, reusing result)
  // const result = spinSlots(user.activeUpgrades || []); // Removed duplicate
  // const reward = calculateReward(bet, result, user.activeUpgrades || [], user.level); // Removed duplicate
  
  // 4. Check for Jackpot Win (🎰 | 🎰 | 🎰)
  let jackpotWin = 0;
  if (result[0].emoji === "🎰" && result[1].emoji === "🎰" && result[2].emoji === "🎰") {
    jackpotWin = getJackpot();
    resetJackpot();
    // Announce Jackpot
    bot.telegram.sendMessage(ctx.chat!.id, `🚨 *JACKPOT WINNER!* 🚨\n\n@${ctx.from!.username || ctx.from!.first_name} just won the Global Jackpot of *${jackpotWin} Credits*!`, { parse_mode: "Markdown" });
  }

  const totalReward = reward + jackpotWin + insuranceRefund;
  user.balance += totalReward;
  
  // --- GAMIFICATION START ---
  let gamificationMessages = "";

  // Add XP (1 per spin + bonus for winning)
  const currentLevel = user.level || 1;
  const currentXp = user.xp || 0;
  const xpGained = Math.floor(bet / 10) + (totalReward > 0 ? 10 : 0);
  user.xp = currentXp + xpGained;
  
  // Check for level up
  const newLevel = calculateLevel(user.xp);
  if (newLevel > currentLevel) {
    user.level = newLevel;
    const title = getLevelTitle(newLevel);
    const bonus = Math.round((getLevelBonus(newLevel) - 1) * 100);
    
    // Add level up message to buffer
    gamificationMessages += `\n\n🎉 *LEVEL UP!* 🎉\nYou are now Level *${newLevel}*!\nNew Title: *${title}*\nPassive Bonus: *+${bonus}%* rewards`;
  }

  // Check Daily Goals
  if (!user.dailyGoals) {
    const { generateDailyGoals } = require("./goals");
    user.dailyGoals = generateDailyGoals();
  }

  const goalsToCheck: any[] = [
    { type: "spin" },
    { type: "bet", amount: bet }
  ];

  if (totalReward > 0) {
    goalsToCheck.push({ type: "win", amount: totalReward / bet }); // Send multiplier for win_big check
  } else {
    goalsToCheck.push({ type: "loss" });
  }

  let goalsUpdated = false;
  goalsToCheck.forEach(event => {
    const result = checkGoals(user, event);
    if (result.updated) goalsUpdated = true;
    
    result.completed.forEach(goal => {
      // Award goal rewards
      user.xp = (user.xp || 0) + goal.rewardXp;
      user.balance += goal.rewardCredits;
      
      // Add goal message to buffer
      gamificationMessages += `\n\n🎯 *GOAL COMPLETED!* 🎯\n*${goal.description}*\n🎁 Rewards: +${goal.rewardXp} XP, +${goal.rewardCredits} Credits`;
    });
  });

  if (goalsUpdated || newLevel > currentLevel) {
    updateUser(user);
  }
  // --- GAMIFICATION END ---

  // Update stats
  user.totalSpins = (user.totalSpins || 0) + 1;
  user.lastBet = bet;
  if (totalReward > 0) {
    user.totalWins = (user.totalWins || 0) + 1;
    user.totalWinnings = (user.totalWinnings || 0) + totalReward;
  }

  updateUser(user);
  
  // Wait for animation
  await new Promise((resolve) => setTimeout(resolve));
  


  // Show result
  const board = `| ${result[0].emoji} | ${result[1].emoji} | ${result[2].emoji} |`;
  const currentJackpot = getJackpot();
  
  let message = "";
  if (totalReward > 0) {
    message = t(lang, "spin_win", {
      board,
      reward: totalReward,
      balance: user.balance,
    });
    if (jackpotWin > 0) {
      message += `\n\n🚨 *JACKPOT WIN: ${jackpotWin} Credits* 🚨`;
    }
  } else {
    message = t(lang, "spin_lose", {
      board,
      bet,
      balance: user.balance,
    });
  }
  
  message += `\n\n🎰 Global Jackpot: *${currentJackpot} Credits*`; // Add insurance message if applicable
  if (insuranceRefund > 0) {
    message += `\n\n🛡️ Insurance refund: +${insuranceRefund} Credits`;
  }

  // Add gamification messages
  if (gamificationMessages) {
    message += gamificationMessages;
  }

  // Build button rows - always include repeat button row to prevent flickering
  const buttonRow = [
    { text: t(lang, "button_spin_10"), callback_data: "spin_10" },
    { text: t(lang, "button_spin_50"), callback_data: "spin_50" },
    { text: t(lang, "button_spin_100"), callback_data: "spin_100" },
  ];

  const buttons = [buttonRow];

  // Always add second row with repeat button (or placeholder) to prevent flickering
  if (user.lastBet && user.balance >= user.lastBet) {
    buttons.push([
      { text: `🔁 ${user.lastBet} Credits`, callback_data: `spin_${user.lastBet}` },
    ]);
  } else if (user.lastBet && user.balance > 0) {
    // Allow user to play with their remaining balance when they can't afford last bet
    buttons.push([{ text: `🔁 ${user.balance} Credits`, callback_data: `spin_${user.balance}` }]);
  } else {
    // Show buy button when user has no balance
    buttons.push([{ text: "💰 Buy Credits", callback_data: "show_buy_menu" }]);
  }

  // Edit the message with final result and buttons
  await ctx.telegram.editMessageText(
    msg.chat.id,
    msg.message_id,
    undefined,
    message,
    {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: buttons,
      },
    }
  );
  } finally {
    // Release spin lock
    user.isSpinning = false;
    updateUser(user);
  }
};

bot.command("spin", (ctx) => {
  const args = ctx.message.text.split(" ");
  const bet = Number(args[1]);

  if (!bet || bet <= 0) {
    return ctx.reply("Usa: /spin <apuesta>");
  }

  executeSpin(ctx, bet);
});

bot.command("play", (ctx) => {
  ctx.reply("🎰 *Elige tu apuesta:*", {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "💰 10 Credits", callback_data: "spin_10" },
          { text: "💰 50 Credits", callback_data: "spin_50" },
          { text: "💰 100 Credits", callback_data: "spin_100" },
        ],
      ],
    },
  });
});

// Invite command
bot.command("invite", (ctx) => {
  const user = getUser(ctx.from!.id);
  const botUsername = ctx.botInfo.username;
  const link = getReferralLink(botUsername, user.id);
  
  let message = "🤝 *INVITE FRIENDS* 🤝\n\n";
  message += "Invite your friends and earn rewards!\n\n";
  message += `💰 *Reward per friend:* 1000 Credits + 50 XP\n`;
  message += `🎁 *Friend gets:* 1000 Credits + 50 XP\n\n`;
  message += `📊 *Your Stats:*\n`;
  message += `Friends Invited: *${user.referralCount || 0}*\n`;
  message += `Total Earnings: *${user.referralEarnings || 0} Credits*\n\n`;
  message += `🔗 *Your Referral Link:*\n\`${link}\``;

  ctx.reply(message, { 
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "📤 Share Link", url: `https://t.me/share/url?url=${link}&text=Join me on Slot Bot and get 1000 free credits!` }]
      ]
    }
  });
});

// Jackpot Command
bot.command("jackpot", (ctx) => {
  const user = getUser(ctx.from.id);
  const lang = user.language as Language;
  const amount = getJackpot();
  
  const message = `${t(lang, "jackpot_title")}\n\n${t(lang, "jackpot_pool", { amount })}\n\n${t(lang, "jackpot_info")}`;
  ctx.reply(message, { parse_mode: "Markdown" });
});

bot.action(/^spin_(\d+)$/, (ctx) => {
  const bet = Number(ctx.match[1]);
  executeSpin(ctx, bet);
  ctx.answerCbQuery(); // Stop the loading animation on the button
});

// Handle noop action (placeholder button)
bot.action("noop", (ctx) => {
  ctx.answerCbQuery(); // Just dismiss the callback
});

// Handle show buy menu action
bot.action("show_buy_menu", async (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;
  
  await ctx.answerCbQuery();
  
  await ctx.reply(
    t(lang, "buy_title") + t(lang, "buy_packages"),
    {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: t(lang, "buy_button_10"), callback_data: "buy_10" }],
          [{ text: t(lang, "buy_button_100"), callback_data: "buy_100" }],
          [{ text: t(lang, "buy_button_500"), callback_data: "buy_500" }],
          [{ text: t(lang, "buy_button_1000"), callback_data: "buy_1000" }],
        ],
      },
    }
  );
});

// Callback handlers for grouped command buttons
bot.action("show_info", async (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;
  
  await ctx.answerCbQuery();
  
  ctx.reply(
    t(lang, "info_title") +
      t(lang, "info_combinations") +
      t(lang, "info_cherry") +
      t(lang, "info_lemon") +
      t(lang, "info_star") +
      t(lang, "info_seven") +
      t(lang, "info_jackpot"),
    { parse_mode: "Markdown" }
  );
});

bot.action("show_jackpot", async (ctx) => {
  const user = getUser(ctx.from.id);
  const lang = user.language as Language;
  const amount = getJackpot();
  
  await ctx.answerCbQuery();
  
  const message = `${t(lang, "jackpot_title")}\n\n${t(lang, "jackpot_pool", { amount })}\n\n${t(lang, "jackpot_info")}`;
  ctx.reply(message, { parse_mode: "Markdown" });
});

bot.action("show_profile", async (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;
  
  await ctx.answerCbQuery();
  
  const level = user.level || 1;
  const title = getLevelTitle(level);
  const progress = getLevelProgress(user.xp || 0, level);
  const bonus = Math.round((getLevelBonus(level) - 1) * 100);
  
  const progressBar = "▓".repeat(Math.floor(progress.percentage / 10)) + "░".repeat(10 - Math.floor(progress.percentage / 10));

  let message = `👤 *USER PROFILE* 👤\n\n`;
  message += `📜 Title: *${title}*\n`;
  message += `🆙 Level: *${level}*\n`;
  message += `✨ XP: ${progress.current} / ${progress.total}\n`;
  message += `   ${progressBar} ${progress.percentage}%\n\n`;
  
  message += `💎 *Stats:*\n`;
  message += `💰 Balance: ${user.balance} Credits\n`;
  message += `🍀 Level Bonus: +${bonus}% rewards\n`;
  message += `🔥 Login Streak: ${user.consecutiveDays || 0} days\n`;
  message += `📅 Total Days: ${user.totalLoginDays || 0} days\n`;

  ctx.reply(message, { parse_mode: "Markdown" });
});

bot.action("show_goals", async (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;
  
  await ctx.answerCbQuery();
  
  if (!user.dailyGoals || user.dailyGoals.length === 0) {
    const { generateDailyGoals } = require("./goals");
    user.dailyGoals = generateDailyGoals();
    updateUser(user);
  }

  let message = "🎯 *DAILY GOALS* 🎯\n\n";
  
  user.dailyGoals!.forEach(goal => {
    const status = goal.completed ? "✅" : "⬜";
    const progress = Math.min(100, Math.floor((goal.current / goal.target) * 100));
    const progressBar = "▓".repeat(Math.floor(progress / 10)) + "░".repeat(10 - Math.floor(progress / 10));
    
    message += `${status} *${goal.description}*\n`;
    if (goal.completed) {
      message += `   🎉 Completed! (+${goal.rewardXp} XP, +${goal.rewardCredits} Credits)\n\n`;
    } else {
      message += `   ${progressBar} ${goal.current}/${goal.target}\n`;
      message += `   🎁 Reward: ${goal.rewardXp} XP, ${goal.rewardCredits} Credits\n\n`;
    }
  });

  ctx.reply(message, { parse_mode: "Markdown" });
});

bot.action("show_daily", async (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;
  
  await ctx.answerCbQuery();
  
  const { canClaimDailyBonus, getDailyBonusAmount } = require("./dailyBonus");

  const streak = user.consecutiveDays || 0;
  const total = user.totalLoginDays || 0;
  const nextBonus = getDailyBonusAmount(streak + 1);
  const canClaim = canClaimDailyBonus(user);

  const status = canClaim
    ? t(lang, "daily_status_available")
    : t(lang, "daily_status_claimed");

  ctx.reply(
    t(lang, "daily_status", {
      streak,
      total,
      balance: user.balance,
      nextBonus,
      status,
    }),
    { parse_mode: "Markdown" }
  );
});

bot.action("show_invite", async (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;
  
  await ctx.answerCbQuery();
  
  const botUsername = (await ctx.telegram.getMe()).username || "slot_bot";
  const link = getReferralLink(botUsername, user.id);
  const referralCount = user.referralCount || 0;
  const referralEarnings = user.referralEarnings || 0;

  let message = `🤝 *INVITE FRIENDS* 🤝\n\n`;
  message += `Share your link and earn rewards when friends join!\n\n`;
  message += `🎁 *Rewards per referral:*\n`;
  message += `• You get: 100 Credits + 50 XP\n`;
  message += `• Friend gets: 100 Credits + 50 XP\n\n`;
  message += `📊 *Your Stats:*\n`;
  message += `👥 Friends invited: ${referralCount}\n`;
  message += `💰 Total earned: ${referralEarnings} Credits\n\n`;
  message += `🔗 *Your referral link:*\n${link}`;

  ctx.reply(message, { parse_mode: "Markdown" });
});

bot.action("show_language", async (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;
  
  await ctx.answerCbQuery();
  
  ctx.reply(t(lang, "language_select"), {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🇬🇧 English", callback_data: "lang_en" },
          { text: "🇪🇸 Español", callback_data: "lang_es" },
        ],
        [
          { text: "🇩🇪 Deutsch", callback_data: "lang_de" },
          { text: "🇮🇹 Italiano", callback_data: "lang_it" },
        ],
        [
          { text: "🇫🇷 Français", callback_data: "lang_fr" },
          { text: "🇷🇺 Русский", callback_data: "lang_ru" },
        ],
      ],
    },
  });
});

bot.action("show_help", async (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;
  
  await ctx.answerCbQuery();
  
  ctx.reply(
    t(lang, "help_title") +
      t(lang, "help_start") +
      t(lang, "help_balance") +
      t(lang, "help_buy") +
      t(lang, "help_info") +
      t(lang, "help_language") +
      t(lang, "help_daily") +
      t(lang, "help_spin") +
      t(lang, "help_help"),
    { parse_mode: "Markdown" }
  );
});

bot.action("show_balance", async (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;
  
  await ctx.answerCbQuery();
  
  ctx.reply(t(lang, "balance_current", { balance: user.balance }));
});


bot.launch();
console.log("Bot iniciado...");

// Payment button handlers
const packages = {
  buy_10: { credits: 10, stars: 1, label: "10 créditos" },
  buy_100: { credits: 100, stars: 10, label: "100 créditos" },
  buy_500: { credits: 500, stars: 45, label: "500 créditos" },
  buy_1000: { credits: 1000, stars: 85, label: "1,000 créditos" },
};

Object.keys(packages).forEach((packageId) => {
  bot.action(packageId, async (ctx) => {
    const pkg = packages[packageId as keyof typeof packages];
    const user = getUser(ctx.from!.id);
    const lang = user.language as Language;

    try {
      await ctx.sendInvoice({
        title: `${pkg.credits} credits`,
        description: `Get ${pkg.credits} credits to play`,
        payload: packageId, // We'll use this to identify the purchase
        provider_token: "", // Empty for Telegram Stars
        currency: "XTR", // Telegram Stars currency code
        prices: [{ label: pkg.label, amount: pkg.stars }],
      });

      ctx.answerCbQuery(t(lang, "payment_processing"));
    } catch (error) {
      console.error("Error creating invoice:", error);
      ctx.answerCbQuery(t(lang, "payment_error"));
    }
  });
});

// Handle pre-checkout query (required by Telegram)
bot.on("pre_checkout_query", (ctx) => {
  ctx.answerPreCheckoutQuery(true);
});

// Handle successful payment
bot.on("successful_payment", async (ctx) => {
  const payment = ctx.message?.successful_payment;
  if (!payment) return;

  const packageId = payment.invoice_payload;
  const pkg = packages[packageId as keyof typeof packages];

  if (pkg) {
    const user = getUser(ctx.from!.id);
    const lang = user.language as Language;
    user.balance += pkg.credits;

    const { updateUser } = require("./users");
    updateUser(user);

    await ctx.reply(
      t(lang, "payment_success", {
        credits: pkg.credits,
        balance: user.balance,
      }),
      { parse_mode: "Markdown" }
    );
  }
});
