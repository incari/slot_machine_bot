import { Telegraf } from "telegraf";
import { getUser, updateUser } from "./users";
import { spinSlots, calculateReward } from "./game";
import { t, Language } from "./translations";
import { setUserLanguage } from "./users";
import { getRandomUpgrades, getUpgradeById } from "./upgrades";
import { ActiveUpgrade } from "./types";
import { processDailyLogin, getDailyBonusEmoji } from "./dailyBonus";

require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN!);

// Helper for delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

bot.start(async (ctx) => {
  const user = getUser(ctx.from!.id);
  const lang = user.language as Language;

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
          { text: "💰 10 TON", callback_data: "spin_10" },
          { text: "💰 50 TON", callback_data: "spin_50" },
          { text: "💰 100 TON", callback_data: "spin_100" },
        ],
      ],
    },
  });
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
    { command: "start", description: "Start bot" },
    { command: "balance", description: "View balance" },
    { command: "shop", description: "Upgrade shop" },
    { command: "buy", description: "Buy credits" },
    { command: "info", description: "View odds" },
    { command: "language", description: "Change language" },
    { command: "daily", description: "Daily login bonus" },
    { command: "spin", description: "Spin slot machine" },
    { command: "help", description: "View help" },
  ],
  es: [
    { command: "start", description: "Iniciar bot" },
    { command: "balance", description: "Ver saldo" },
    { command: "shop", description: "Tienda de mejoras" },
    { command: "buy", description: "Comprar créditos" },
    { command: "info", description: "Ver probabilidades" },
    { command: "language", description: "Cambiar idioma" },
    { command: "daily", description: "Bono de inicio diario" },
    { command: "spin", description: "Girar tragamonedas" },
    { command: "help", description: "Ver ayuda" },
  ],
  de: [
    { command: "start", description: "Bot starten" },
    { command: "balance", description: "Guthaben anzeigen" },
    { command: "shop", description: "Upgrade-Shop" },
    { command: "buy", description: "Credits kaufen" },
    { command: "info", description: "Gewinnchancen anzeigen" },
    { command: "language", description: "Sprache ändern" },
    { command: "daily", description: "Täglicher Login-Bonus" },
    { command: "spin", description: "Spielautomat drehen" },
    { command: "help", description: "Hilfe anzeigen" },
  ],
  it: [
    { command: "start", description: "Avvia bot" },
    { command: "balance", description: "Visualizza saldo" },
    { command: "shop", description: "Negozio upgrade" },
    { command: "buy", description: "Acquista crediti" },
    { command: "info", description: "Visualizza probabilità" },
    { command: "language", description: "Cambia lingua" },
    { command: "daily", description: "Bonus accesso giornaliero" },
    { command: "spin", description: "Gira slot machine" },
    { command: "help", description: "Visualizza aiuto" },
  ],
  fr: [
    { command: "start", description: "Démarrer le bot" },
    { command: "balance", description: "Voir le solde" },
    { command: "shop", description: "Boutique d'améliorations" },
    { command: "buy", description: "Acheter des crédits" },
    { command: "info", description: "Voir les probabilités" },
    { command: "language", description: "Changer de langue" },
    { command: "daily", description: "Bonus de connexion quotidien" },
    { command: "spin", description: "Tourner la machine" },
    { command: "help", description: "Voir l'aide" },
  ],
  ru: [
    { command: "start", description: "Запустить бота" },
    { command: "balance", description: "Посмотреть баланс" },
    { command: "shop", description: "Магазин улучшений" },
    { command: "buy", description: "Купить кредиты" },
    { command: "info", description: "Посмотреть шансы" },
    { command: "language", description: "Изменить язык" },
    { command: "daily", description: "Ежедневный бонус" },
    { command: "spin", description: "Крутить автомат" },
    { command: "help", description: "Посмотреть помощь" },
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
  shopMessage += `💰 Your Balance: ${user.balance} TON\n\n`;

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
    shopMessage += `   💵 Cost: ${upgrade.cost} TON\n\n`;

    return [
      {
        text: `${emoji} Buy ${upgrade.cost} TON`,
        callback_data: `buy_upgrade_${upgrade.id}`,
      },
    ];
  });

  // Add refresh button
  buttons.push([
    { text: "🔄 Refresh (1000 TON)", callback_data: "refresh_shop" },
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
    ctx.answerCbQuery(`❌ Not enough balance! Need ${REFRESH_COST} TON`);
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
  shopMessage += `💰 Your Balance: ${user.balance} TON\n\n`;

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
    shopMessage += `   💵 Cost: ${upgrade.cost} TON\n\n`;

    return [
      {
        text: `${emoji} Buy ${upgrade.cost} TON`,
        callback_data: `buy_upgrade_${upgrade.id}`,
      },
    ];
  });

  buttons.push([
    { text: "🔄 Refresh (1000 TON)", callback_data: "refresh_shop" },
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
    ctx.answerCbQuery(`❌ Not enough balance! Need ${upgrade.cost} TON`);
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
  confirmMessage += `💰 New Balance: ${user.balance} TON\n\n`;

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

  if (user.balance < bet) {
    return ctx.reply(
      t(lang, "spin_insufficient", { balance: user.balance, bet }),
      {
        reply_markup: {
          inline_keyboard: [[{ text: "🔙 Menu", callback_data: "menu" }]],
        },
      }
    );
  }

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
    { text: `🔁 ${bet} TON`, callback_data: `spin_${bet}` },
  ]);

  const msg = await ctx.reply(spinningText, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: animationButtons,
    },
  });

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

  await delay(150);

  const result = spinSlots(user.activeUpgrades || []);
  const reward = calculateReward(bet, result, user.activeUpgrades || []);

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
  user.balance += reward;
  user.balance += insuranceRefund; // Add insurance refund
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

  // Save changes!
  updateUser(user);

  const board = `${result[0].emoji} | ${result[1].emoji} | ${result[2].emoji}`;

  let message =
    reward > 0
      ? t(lang, "spin_win", { board, reward, balance: user.balance })
      : t(lang, "spin_lose", { board, bet, balance: user.balance });

  // Add insurance message if applicable
  if (insuranceRefund > 0) {
    message += `\n\n🛡️ Insurance refund: +${insuranceRefund} TON`;
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
      { text: `🔁 ${user.lastBet} TON`, callback_data: `spin_${user.lastBet}` },
    ]);
  } else {
    // Add empty placeholder row to maintain consistent layout
    buttons.push([{ text: "─────3333-────", callback_data: "noop" }]);
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
          { text: "💰 10 TON", callback_data: "spin_10" },
          { text: "💰 50 TON", callback_data: "spin_50" },
          { text: "💰 100 TON", callback_data: "spin_100" },
        ],
      ],
    },
  });
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
