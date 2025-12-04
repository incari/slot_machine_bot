import { Telegraf } from "telegraf";
import "dotenv/config";

import { getUser } from "./users";
import { spinSlots, calculateReward } from "./game";

const bot = new Telegraf(process.env.BOT_TOKEN!);

// Helper for delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

bot.start((ctx) => {
  const user = getUser(ctx.from!.id);
  ctx.reply(
    `🎰 Bienvenido a la tragamonedas TON!\nTu balance: ${user.balance} TON\n\n*Elige tu apuesta:*`,
    {
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
    }
  );
});

bot.help((ctx) => {
  ctx.reply(
    "📜 *Lista de Comandos* 📜\n\n" +
    "/start - Iniciar el bot y ver balance\n" +
    "/balance - Ver tu saldo actual\n" +
    "/spin <cantidad> - Girar la tragamonedas (ej: /spin 10)\n" +
    "/help - Ver este mensaje de ayuda",
    { parse_mode: "Markdown" }
  );
});

bot.telegram.setMyCommands([
  { command: "start", description: "Iniciar bot" },
  { command: "balance", description: "Ver saldo" },
  { command: "spin", description: "Girar tragamonedas" },
  { command: "help", description: "Ver ayuda" },
]);


bot.command("balance", (ctx) => {
  const user = getUser(ctx.from!.id);
  ctx.reply(`💰 Tu balance actual es: ${user.balance} TON`);
});

// Reusable spin logic
const executeSpin = async (ctx: any, bet: number) => {
  const user = getUser(ctx.from!.id);

  if (user.balance < bet) {
    return ctx.reply("No tienes suficiente balance.", {
       reply_markup: {
        inline_keyboard: [
          [{ text: "🔙 Menú Principal", callback_data: "menu" }]
        ]
      }
    });
  }

  // Animation with consistent message length to prevent flickering
  const spinningText = "🎰 *GIRANDO...* 🎰\n" +
                       "──────────────\n" +
                       "❓ | ❓ | ❓\n" +
                       "──────────────\n" +
                       "📉 Calculando tu nuevo balance...\n" +
                       "💰 Veamos tu suerte";
  
  const msg = await ctx.reply(spinningText, { 
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🔄 10", callback_data: "spin_10" },
          { text: "🔄 50", callback_data: "spin_50" },
          { text: "🔄 100", callback_data: "spin_100" },
        ],
      ],
    },
  });

  for (let i = 0; i < 3; i++) {
    await delay(150);
    const tempResult = spinSlots();
    const tempBoard = `${tempResult[0].emoji} | ${tempResult[1].emoji} | ${tempResult[2].emoji}`;
    try {
        await ctx.telegram.editMessageText(
            msg.chat.id,
            msg.message_id,
            undefined,
            `🎰 *GIRANDO...* 🎰\n` +
            `──────────────\n` +
            `${tempBoard}\n` +
            `──────────────\n` +
            `📉 Calculando tu nuevo balance...\n` +
            `💰 Veamos tu suerte`,
            { 
              parse_mode: "Markdown",
              reply_markup: {
                inline_keyboard: [
                  [
                    { text: "🔄 10", callback_data: "spin_10" },
                    { text: "🔄 50", callback_data: "spin_50" },
                    { text: "🔄 100", callback_data: "spin_100" },
                  ],
                ],
              },
            }
        );
    } catch (e) {
        // Ignore errors if message is not modified
    }
  }

  await delay(150);

  const result = spinSlots();
  const reward = calculateReward(bet, result);

  user.balance -= bet;
  user.balance += reward;
  
  // Save changes!
  const { updateUser } = require("./users");
  updateUser(user);

  const board = `${result[0].emoji} | ${result[1].emoji} | ${result[2].emoji}`;
  
  const winMessage = `🎉 *¡GANASTE!* 🎉\n` +
                     `──────────────\n` +
                     `${board}\n` +
                     `──────────────\n` +
                     `💸 Recompensa: *${reward} TON*\n` +
                     `💰 Nuevo balance: ${user.balance} TON`;

  const loseMessage = `💀 *PERDISTE* 💀\n` +
                      `──────────────\n` +
                      `${board}\n` +
                      `──────────────\n` +
                      `📉 Perdiste: ${bet} TON\n` +
                      `💰 Nuevo balance: ${user.balance} TON`;

  const message = reward > 0 ? winMessage : loseMessage;

  // Edit the message with final result and buttons
  await ctx.telegram.editMessageText(
    msg.chat.id,
    msg.message_id,
    undefined,
    message,
    {
        parse_mode: "Markdown",
        reply_markup: {
        inline_keyboard: [
            [
            { text: "🔄 10", callback_data: "spin_10" },
            { text: "🔄 50", callback_data: "spin_50" },
            { text: "🔄 100", callback_data: "spin_100" },
            ],
        ],
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

bot.launch();
console.log("Bot iniciado...");
