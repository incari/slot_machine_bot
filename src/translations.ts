export type Language = "en" | "es" | "de" | "it" | "fr" | "ru";

interface Translation {
  [key: string]: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    // Commands
    start_welcome:
      "🎰 Welcome to the Credits Slot Machine!\nYour balance: {balance} Credits\n\n*Choose your bet:*",

    welcome_guide: `🎰 *WELCOME TO CREDITS SLOT MACHINE!* 🎰

━━━━━━━━━━━━━━━━━━━━━
🎮 *HOW TO PLAY*
━━━━━━━━━━━━━━━━━━━━━
Choose your bet (10, 50, or 100 credits) and spin! Match 3 symbols to win big!

━━━━━━━━━━━━━━━━━━━━━
💰 *HOW TO WIN*
━━━━━━━━━━━━━━━━━━━━━
🍒🍒🍒 - 4x your bet (12.5% chance)
🍋🍋🍋 - 20x your bet (0.8% chance)
⭐⭐⭐ - 40x your bet (0.34% chance)
7️⃣7️⃣7️⃣ - 150x your bet (0.1% chance)
🎰🎰🎰 - *GLOBAL JACKPOT!* (0.0125%)

━━━━━━━━━━━━━━━━━━━━━
🏆 *GLOBAL JACKPOT*
━━━━━━━━━━━━━━━━━━━━━
• 1% of every bet grows the jackpot pool
• Hit 🎰🎰🎰 to win the ENTIRE pool!
• Check current pool: /jackpot

━━━━━━━━━━━━━━━━━━━━━
🏪 *UPGRADE SHOP*
━━━━━━━━━━━━━━━━━━━━━
• Buy upgrades to boost your odds!
• Increase win probabilities
• Get multipliers & insurance
• Access shop: /shop

━━━━━━━━━━━━━━━━━━━━━
⚡ *XP & LEVELING SYSTEM*
━━━━━━━━━━━━━━━━━━━━━
• Earn XP with every spin
• Level up for passive bonuses
• Higher levels = bigger rewards!
• View profile: /profile

━━━━━━━━━━━━━━━━━━━━━
🎯 *DAILY GOALS*
━━━━━━━━━━━━━━━━━━━━━
• Complete daily challenges
• Earn bonus XP & Credits
• New goals every day!
• Check goals: /goals

━━━━━━━━━━━━━━━━━━━━━
🔥 *DAILY LOGIN BONUS*
━━━━━━━━━━━━━━━━━━━━━
• Login daily for free credits
• Build streaks for bigger bonuses
• Don't break your streak!
• Check status: /daily

━━━━━━━━━━━━━━━━━━━━━
🤝 *SHARE TO WIN CREDITS*
━━━━━━━━━━━━━━━━━━━━━
• Invite friends with your link
• Both you & friend get rewards!
• Earn credits + XP per referral
• Get link: /invite

━━━━━━━━━━━━━━━━━━━━━
💎 *BUY MORE CREDITS*
━━━━━━━━━━━━━━━━━━━━━
• Purchase with Telegram Stars
• Get bonus credits on larger packs
• Safe & secure payment
• Buy now: /buy

━━━━━━━━━━━━━━━━━━━━━

🎲 *Ready to spin?* Use the buttons below or type /spin to get started!

💡 *Tip:* Start with daily login bonus and complete goals for free credits!`,
    help_title: "📜 *Command List* 📜\n\n",
    help_start: "/start - Start the bot and view balance\n",
    help_balance: "/balance - View your current balance\n",
    help_buy: "/buy - Buy credits with Telegram Stars\n",
    help_info: "/info - View odds and prizes\n",
    help_language: "/language - Change language\n",
    help_spin: "/spin <amount> - Spin the slot machine (e.g., /spin 10)\n",
    help_help: "/help - View this help message",

    // Balance
    balance_current: "💰 Your current balance is: {balance} Credits",

    // Buy credits
    buy_title: "💰 *Buy Credits* 💰\n\n",
    buy_packages:
      "Choose a credit package:\n\n🌟 10 credits = 1 Star\n⭐ 100 credits = 10 Stars\n✨ 500 credits = 45 Stars (10% bonus!)\n💫 1,000 credits = 85 Stars (15% bonus!)",
    buy_button_10: "🌟 10 credits (1 Star)",
    buy_button_100: "⭐ 100 credits (10 Stars)",
    buy_button_500: "✨ 500 credits (45 Stars)",
    buy_button_1000: "💫 1,000 credits (85 Stars)",

    // Info
    info_title: "📊 *Game Odds* 📊\n\n",
    info_combinations: "*Winning Combinations:*\n\n",
    info_cherry:
      "🍒🍒🍒 - 4x your bet\n├ Probability: 12.5% (1 in 8)\n└ Example: Bet 10 → Win 40\n\n",
    info_lemon:
      "🍋🍋🍋 - 20x your bet\n├ Probability: 0.8% (1 in 125)\n└ Example: Bet 10 → Win 200\n\n",
    info_star:
      "⭐⭐⭐ - 40x your bet\n├ Probability: 0.34% (1 in 296)\n└ Example: Bet 10 → Win 400\n\n",
    info_seven:
      "7️⃣7️⃣7️⃣ - 150x your bet\n├ Probability: 0.1% (1 in 1,000)\n└ Example: Bet 10 → Win 1,500\n\n",
    info_jackpot:
      "🎰🎰🎰 GLOBAL JACKPOT - Win the entire pool!\n├ Probability: 0.0125% (1 in 8,000)\n└ Example: Pool at 50,000 → Win 50,000\n\n",
    info_stats:
      "*Statistics:*\n• Win rate: ~13.7%\n• RTP (Return to player): ~91.5%\n• House edge: ~8.5%\n\n",
    info_disclaimer:
      "⚠️ *Note:* Credits have no cash value.\nThis is an entertainment game.",

    // Jackpot
    jackpot_title: "🎰 *GLOBAL JACKPOT* 🎰",
    jackpot_pool: "Current Pool: *{amount} Credits*",
    jackpot_info:
      "Spin to win! 1% of every bet grows the pot.\nHit 🎰 | 🎰 | 🎰 to win it all!",

    // Language
    language_select:
      "🌍 *Select Language* 🌍\n\nChoose your preferred language:",
    language_changed: "✅ Language changed to English!",

    // Spin
    spin_insufficient:
      "❌ Insufficient balance!\n\nYour balance: {balance} Credits\nRequired: {bet} Credits",
    spin_spinning: `🎰 *SPINNING...* 🎰
─────────── 
❓ | ❓ | ❓
───────────
📉 Calculating your new balance...
💰 Let's see your luck

 🎰 Checking jackpot...`,
    spin_win: `🎉 *YOU WON!* 🎉
─────────── 
{board}
───────────
💸 Reward: *{reward} Credits*
💰 New balance: {balance} Credits`,
    spin_lose: `💀 *YOU LOST* 💀
───────────
{board}
───────────
📉 Lost: {bet} Credits
💰 New balance: {balance} Credits`,

    // Payment
    payment_processing: "Processing payment...",
    payment_error: "Error creating invoice. Try again.",
    payment_success:
      "✅ *Payment successful!*\n\nYou received *{credits} credits*\n💰 New balance: {balance} Credits\n\nGood luck! 🎰",

    // Buttons
    button_spin_10: "🔄 10",
    button_spin_50: "🔄 50",
    button_spin_100: "🔄 100",

    // Daily Bonus
    daily_bonus_claimed:
      "{emoji} *DAILY BONUS!* {emoji}\n\n🎁 You received: *{bonus} Credits*\n🔥 Streak: *{streak} days*\n💰 New balance: {balance} Credits\n\n✨ Come back tomorrow to continue your streak!",
    daily_bonus_streak_broken:
      "{emoji} *DAILY BONUS!* {emoji}\n\n🎁 You received: *{bonus} Credits*\n💔 Your streak was broken!\n🔥 New streak: *1 day*\n💰 New balance: {balance} Credits\n\n✨ Login daily to build a bigger streak!",
    daily_bonus_already_claimed:
      "⏰ *Already claimed today!*\n\n🔥 Current streak: *{streak} days*\n💰 Your balance: {balance} Credits\n\n✨ Come back tomorrow for your next bonus!",
    daily_status:
      "📅 *DAILY LOGIN STATUS*\n\n🔥 Current streak: *{streak} days*\n📊 Total login days: *{total} days*\n💰 Current balance: {balance} Credits\n\n🎁 Next bonus: *{nextBonus} Credits*\n⏰ {status}\n\n✨ Login every day to maximize your rewards!",
    daily_status_available: "Available now! Use /start to claim",
    daily_status_claimed: "Already claimed today. Come back tomorrow!",
    help_daily: "/daily - View daily login streak and bonus\n",
  },

  es: {
    // Commands
    start_welcome:
      "🎰 ¡Bienvenido a la tragamonedas Credits!\nTu balance: {balance} Credits\n\n*Elige tu apuesta:*",

    welcome_guide: `🎰 *¡BIENVENIDO A CREDITS SLOT MACHINE!* 🎰

━━━━━━━━━━━━━━━━━━━━━
🎮 *CÓMO JUGAR*
━━━━━━━━━━━━━━━━━━━━━
¡Elige tu apuesta (10, 50 o 100 créditos) y gira! ¡Combina 3 símbolos para ganar en grande!

━━━━━━━━━━━━━━━━━━━━━
💰 *CÓMO GANAR*
━━━━━━━━━━━━━━━━━━━━━
🍒🍒🍒 - 4x tu apuesta (12.5% probabilidad)
🍋🍋🍋 - 20x tu apuesta (0.8% probabilidad)
⭐⭐⭐ - 40x tu apuesta (0.34% probabilidad)
7️⃣7️⃣7️⃣ - 150x tu apuesta (0.1% probabilidad)
🎰🎰🎰 - *¡BOTE GLOBAL!* (0.0125%)

━━━━━━━━━━━━━━━━━━━━━
🏆 *BOTE GLOBAL*
━━━━━━━━━━━━━━━━━━━━━
• El 1% de cada apuesta aumenta el bote
• ¡Consigue 🎰🎰🎰 para ganar TODO el bote!
• Ver bote actual: /jackpot

━━━━━━━━━━━━━━━━━━━━━
🏪 *TIENDA DE MEJORAS*
━━━━━━━━━━━━━━━━━━━━━
• ¡Compra mejoras para aumentar tus probabilidades!
• Aumenta probabilidades de victoria
• Obtén multiplicadores y seguro
• Acceder a tienda: /shop

━━━━━━━━━━━━━━━━━━━━━
⚡ *SISTEMA DE XP Y NIVELES*
━━━━━━━━━━━━━━━━━━━━━
• Gana XP con cada giro
• Sube de nivel para bonos pasivos
• ¡Niveles más altos = recompensas mayores!
• Ver perfil: /profile

━━━━━━━━━━━━━━━━━━━━━
🎯 *OBJETIVOS DIARIOS*
━━━━━━━━━━━━━━━━━━━━━
• Completa desafíos diarios
• Gana XP y Créditos bonus
• ¡Nuevos objetivos cada día!
• Ver objetivos: /goals

━━━━━━━━━━━━━━━━━━━━━
🔥 *BONO DE INICIO DIARIO*
━━━━━━━━━━━━━━━━━━━━━
• Inicia sesión diariamente para créditos gratis
• Construye rachas para bonos mayores
• ¡No rompas tu racha!
• Ver estado: /daily

━━━━━━━━━━━━━━━━━━━━━
🤝 *COMPARTE PARA GANAR CRÉDITOS*
━━━━━━━━━━━━━━━━━━━━━
• Invita amigos con tu enlace
• ¡Tú y tu amigo reciben recompensas!
• Gana créditos + XP por referido
• Obtener enlace: /invite

━━━━━━━━━━━━━━━━━━━━━
💎 *COMPRAR MÁS CRÉDITOS*
━━━━━━━━━━━━━━━━━━━━━
• Compra con Telegram Stars
• Obtén créditos bonus en paquetes grandes
• Pago seguro y protegido
• Comprar ahora: /buy

━━━━━━━━━━━━━━━━━━━━━

🎲 *¿Listo para girar?* ¡Usa los botones de abajo o escribe /spin para comenzar!

💡 *Consejo:* ¡Comienza con el bono de inicio diario y completa objetivos para créditos gratis!`,
    help_title: "📜 *Lista de Comandos* 📜\n\n",
    help_start: "/start - Iniciar el bot y ver balance\n",
    help_balance: "/balance - Ver tu saldo actual\n",
    help_buy: "/buy - Comprar créditos con Telegram Stars\n",
    help_info: "/info - Ver probabilidades y premios\n",
    help_language: "/language - Cambiar idioma\n",
    help_spin: "/spin <cantidad> - Girar la tragamonedas (ej: /spin 10)\n",
    help_help: "/help - Ver este mensaje de ayuda",

    balance_current: "💰 Tu balance actual es: {balance} Credits",

    buy_title: "💰 *Comprar Créditos* 💰\n\n",
    buy_packages:
      "Elige un paquete de créditos:\n\n🌟 10 créditos = 1 Star\n⭐ 100 créditos = 10 Stars\n✨ 500 créditos = 45 Stars (¡10% bonus!)\n💫 1,000 créditos = 85 Stars (¡15% bonus!)",
    buy_button_10: "🌟 10 créditos (1 Star)",
    buy_button_100: "⭐ 100 créditos (10 Stars)",
    buy_button_500: "✨ 500 créditos (45 Stars)",
    buy_button_1000: "💫 1,000 créditos (85 Stars)",

    info_title: "📊 *Probabilidades del Juego* 📊\n\n",
    info_combinations: "*Combinaciones Ganadoras:*\n\n",
    info_cherry:
      "🍒🍒🍒 - 4x tu apuesta\n├ Probabilidad: 12.5% (1 de cada 8)\n└ Ejemplo: Apuesta 10 → Ganas 40\n\n",
    info_lemon:
      "🍋🍋🍋 - 20x tu apuesta\n├ Probabilidad: 0.8% (1 de cada 125)\n└ Ejemplo: Apuesta 10 → Ganas 200\n\n",
    info_star:
      "⭐⭐⭐ - 40x tu apuesta\n├ Probabilidad: 0.34% (1 de cada 296)\n└ Ejemplo: Apuesta 10 → Ganas 400\n\n",
    info_seven:
      "7️⃣7️⃣7️⃣ - 150x tu apuesta\n├ Probabilidad: 0.1% (1 en 1,000)\n└ Ejemplo: Apuesta 10 → Gana 1,500\n\n",
    info_jackpot:
      "🎰🎰🎰 BOTE GLOBAL - ¡Gana todo el bote!\n├ Probabilidad: 0.0125% (1 en 8,000)\n└ Ejemplo: Bote en 50,000 → Gana 50,000\n\n",
    info_stats:
      "*Estadísticas:*\n• Tasa de victoria: ~13.7%\n• RTP (Retorno al jugador): ~91.5%\n• Ventaja de la casa: ~8.5%\n\n",
    info_disclaimer:
      "⚠️ *Nota:* Los créditos no tienen valor en efectivo.\nEste es un juego de entretenimiento.",

    // Jackpot
    jackpot_title: "🎰 *BOTE GLOBAL* 🎰",
    jackpot_pool: "Bote Actual: *{amount} Créditos*",
    jackpot_info:
      "¡Gira para ganar! El 1% de cada apuesta aumenta el bote.\n¡Consigue 🎰 | 🎰 | 🎰 para ganarlo todo!",

    language_select: "🌍 *Seleccionar Idioma* 🌍\n\nElige tu idioma preferido:",
    language_changed: "✅ ¡Idioma cambiado a Español!",

    spin_insufficient:
      "❌ ¡Saldo insuficiente!\n\nTu balance: {balance} Credits\nRequerido: {bet} Credits",
    spin_spinning: `🎰 *GIRANDO...* 🎰
───────────────────
❓ | ❓ | ❓
───────────────────
📉 Calculando tu nuevo balance...
💰 Veamos tu suerte

 🎰 Comprobando jackpot...`,
    spin_win: `🎉 *¡GANASTE!* 🎉
───────────────────
{board}
───────────────────
💸 Recompensa: *{reward} Credits*
💰 Nuevo balance: {balance} Credits`,
    spin_lose: `💀 *PERDISTE* 💀
───────────────────
{board}
───────────────────
📉 Perdiste: {bet} Credits
💰 Nuevo balance: {balance} Credits`,

    payment_processing: "Procesando pago...",
    payment_error: "Error al crear la factura. Intenta de nuevo.",
    payment_success:
      "✅ *¡Pago exitoso!*\n\nHas recibido *{credits} créditos*\n💰 Nuevo balance: {balance} Credits\n\n¡Buena suerte! 🎰",

    button_spin_10: "🔄 10",
    button_spin_50: "🔄 50",
    button_spin_100: "🔄 100",

    // Daily Bonus
    daily_bonus_claimed:
      "{emoji} *¡BONO DIARIO!* {emoji}\n\n🎁 Recibiste: *{bonus} Credits*\n🔥 Racha: *{streak} días*\n💰 Nuevo balance: {balance} Credits\n\n✨ ¡Vuelve mañana para continuar tu racha!",
    daily_bonus_streak_broken:
      "{emoji} *¡BONO DIARIO!* {emoji}\n\n🎁 Recibiste: *{bonus} Credits*\n💔 ¡Tu racha se rompió!\n🔥 Nueva racha: *1 día*\n💰 Nuevo balance: {balance} Credits\n\n✨ ¡Inicia sesión diariamente para construir una racha mayor!",
    daily_bonus_already_claimed:
      "⏰ *¡Ya reclamado hoy!*\n\n🔥 Racha actual: *{streak} días*\n💰 Tu balance: {balance} Credits\n\n✨ ¡Vuelve mañana por tu próximo bono!",
    daily_status:
      "📅 *ESTADO DE INICIO DIARIO*\n\n🔥 Racha actual: *{streak} días*\n📊 Total de días: *{total} días*\n💰 Balance actual: {balance} Credits\n\n🎁 Próximo bono: *{nextBonus} Credits*\n⏰ {status}\n\n✨ ¡Inicia sesión todos los días para maximizar tus recompensas!",
    daily_status_available: "¡Disponible ahora! Usa /start para reclamar",
    daily_status_claimed: "Ya reclamado hoy. ¡Vuelve mañana!",
    help_daily: "/daily - Ver racha de inicio diario y bono\n",
  },

  de: {
    start_welcome:
      "🎰 Willkommen beim Credits Spielautomaten!\nDein Guthaben: {balance} Credits\n\n*Wähle deinen Einsatz:*",

    welcome_guide: `🎰 *WILLKOMMEN BEI CREDITS SLOT MACHINE!* 🎰

━━━━━━━━━━━━━━━━━━━━━
🎮 *WIE MAN SPIELT*
━━━━━━━━━━━━━━━━━━━━━
Wähle deinen Einsatz (10, 50 oder 100 Credits) und drehe! Kombiniere 3 Symbole für große Gewinne!

━━━━━━━━━━━━━━━━━━━━━
💰 *WIE MAN GEWINNT*
━━━━━━━━━━━━━━━━━━━━━
🍒🍒🍒 - 4x dein Einsatz (12.5% Chance)
🍋🍋🍋 - 20x dein Einsatz (0.8% Chance)
⭐⭐⭐ - 40x dein Einsatz (0.34% Chance)
7️⃣7️⃣7️⃣ - 150x dein Einsatz (0.1% Chance)
🎰🎰🎰 - *GLOBALER JACKPOT!* (0.0125%)

━━━━━━━━━━━━━━━━━━━━━
🏆 *GLOBALER JACKPOT*
━━━━━━━━━━━━━━━━━━━━━
• 1% jeder Wette lässt den Jackpot wachsen
• Erhalte 🎰🎰🎰 um den GESAMTEN Pool zu gewinnen!
• Aktuellen Pool prüfen: /jackpot

━━━━━━━━━━━━━━━━━━━━━
🏪 *UPGRADE-SHOP*
━━━━━━━━━━━━━━━━━━━━━
• Kaufe Upgrades um deine Chancen zu verbessern!
• Erhöhe Gewinnwahrscheinlichkeiten
• Erhalte Multiplikatoren & Versicherung
• Shop öffnen: /shop

━━━━━━━━━━━━━━━━━━━━━
⚡ *XP & LEVEL-SYSTEM*
━━━━━━━━━━━━━━━━━━━━━
• Verdiene XP mit jedem Dreh
• Steige auf für passive Boni
• Höhere Level = größere Belohnungen!
• Profil ansehen: /profile

━━━━━━━━━━━━━━━━━━━━━
🎯 *TÄGLICHE ZIELE*
━━━━━━━━━━━━━━━━━━━━━
• Erfülle tägliche Herausforderungen
• Verdiene Bonus-XP & Credits
• Jeden Tag neue Ziele!
• Ziele prüfen: /goals

━━━━━━━━━━━━━━━━━━━━━
🔥 *TÄGLICHER LOGIN-BONUS*
━━━━━━━━━━━━━━━━━━━━━
• Melde dich täglich an für gratis Credits
• Baue Serien auf für größere Boni
• Unterbreche deine Serie nicht!
• Status prüfen: /daily

━━━━━━━━━━━━━━━━━━━━━
🤝 *TEILEN FÜR CREDITS*
━━━━━━━━━━━━━━━━━━━━━
• Lade Freunde mit deinem Link ein
• Du & dein Freund erhalten Belohnungen!
• Verdiene Credits + XP pro Empfehlung
• Link erhalten: /invite

━━━━━━━━━━━━━━━━━━━━━
💎 *MEHR CREDITS KAUFEN*
━━━━━━━━━━━━━━━━━━━━━
• Kaufe mit Telegram Stars
• Erhalte Bonus-Credits bei größeren Paketen
• Sichere Zahlung
• Jetzt kaufen: /buy

━━━━━━━━━━━━━━━━━━━━━

🎲 *Bereit zum Drehen?* Nutze die Buttons unten oder tippe /spin um zu starten!

💡 *Tipp:* Beginne mit dem täglichen Login-Bonus und erfülle Ziele für gratis Credits!`,
    help_title: "📜 *Befehlsliste* 📜\n\n",
    help_start: "/start - Bot starten und Guthaben anzeigen\n",
    help_balance: "/balance - Aktuelles Guthaben anzeigen\n",
    help_buy: "/buy - Credits mit Telegram Stars kaufen\n",
    help_info: "/info - Gewinnchancen und Preise anzeigen\n",
    help_language: "/language - Sprache ändern\n",
    help_spin: "/spin <betrag> - Spielautomat drehen (z.B.: /spin 10)\n",
    help_help: "/help - Diese Hilfenachricht anzeigen",

    balance_current: "💰 Dein aktuelles Guthaben ist: {balance} Credits",

    buy_title: "💰 *Credits kaufen* 💰\n\n",
    buy_packages:
      "Wähle ein Credit-Paket:\n\n🌟 10 Credits = 1 Star\n⭐ 100 Credits = 10 Stars\n✨ 500 Credits = 45 Stars (10% Bonus!)\n💫 1.000 Credits = 85 Stars (15% Bonus!)",
    buy_button_10: "🌟 10 Credits (1 Star)",
    buy_button_100: "⭐ 100 Credits (10 Stars)",
    buy_button_500: "✨ 500 Credits (45 Stars)",
    buy_button_1000: "💫 1.000 Credits (85 Stars)",

    info_title: "📊 *Spielchancen* 📊\n\n",
    info_combinations: "*Gewinnkombinationen:*\n\n",
    info_cherry:
      "🍒🍒🍒 - 4x dein Einsatz\n├ Wahrscheinlichkeit: 12,5% (1 von 8)\n└ Beispiel: Einsatz 10 → Gewinn 40\n\n",
    info_lemon:
      "🍋🍋🍋 - 20x dein Einsatz\n├ Wahrscheinlichkeit: 0,8% (1 von 125)\n└ Beispiel: Einsatz 10 → Gewinn 200\n\n",
    info_star:
      "⭐⭐⭐ - 40x dein Einsatz\n├ Wahrscheinlichkeit: 0,34% (1 von 296)\n└ Beispiel: Einsatz 10 → Gewinn 400\n\n",
    info_seven:
      "7️⃣7️⃣7️⃣ - 150x Ihren Einsatz\n├ Wahrscheinlichkeit: 0.1% (1 zu 1,000)\n└ Beispiel: Einsatz 10 → Gewinn 1,500\n\n",
    info_jackpot:
      "🎰🎰🎰 GLOBALER JACKPOT - Gewinnen Sie den gesamten Pool!\n├ Wahrscheinlichkeit: 0.0125% (1 zu 8,000)\n└ Beispiel: Pool bei 50,000 → Gewinn 50,000\n\n",
    info_stats:
      "*Statistiken:*\n• Gewinnrate: ~13,7%\n• RTP (Return to Player): ~91,5%\n• Hausvorteil: ~8,5%\n\n",
    info_disclaimer:
      "⚠️ *Hinweis:* Credits haben keinen Barwert.\nDies ist ein Unterhaltungsspiel.",

    // Jackpot
    jackpot_title: "🎰 *GLOBALER JACKPOT* 🎰",
    jackpot_pool: "Aktueller Pool: *{amount} Credits*",
    jackpot_info:
      "Drehen Sie, um zu gewinnen! 1% jeder Wette lässt den Pot wachsen.\nErhalten Sie 🎰 | 🎰 | 🎰, um alles zu gewinnen!",

    language_select:
      "🌍 *Sprache wählen* 🌍\n\nWähle deine bevorzugte Sprache:",
    language_changed: "✅ Sprache auf Deutsch geändert!",

    spin_insufficient:
      "❌ Unzureichendes Guthaben!\n\nDein Guthaben: {balance} Credits\nBenötigt: {bet} Credits",
    spin_spinning: `🎰 *DREHT...* 🎰
───────────────────
❓ | ❓ | ❓
───────────────────
📉 Berechne dein neues Guthaben...
💰 Mal sehen, was das Glück bringt

 🎰 Jackpot prüfen...`,
    spin_win: `🎉 *GEWONNEN!* 🎉
───────────────────
{board}
───────────────────
💸 Gewinn: *{reward} Credits*
💰 Neues Guthaben: {balance} Credits`,
    spin_lose: `💀 *VERLOREN* 💀
───────────────────
{board}
───────────────────
📉 Verlust: {bet} Credits
💰 Neues Guthaben: {balance} Credits`,

    payment_processing: "Zahlung wird verarbeitet...",
    payment_error: "Fehler beim Erstellen der Rechnung. Versuche es erneut.",
    payment_success:
      "✅ *Zahlung erfolgreich!*\n\nDu hast *{credits} Credits* erhalten\n💰 Neues Guthaben: {balance} Credits\n\nViel Glück! 🎰",

    button_spin_10: "🔄 10",
    button_spin_50: "🔄 50",
    button_spin_100: "🔄 100",

    // Daily Bonus
    daily_bonus_claimed:
      "{emoji} *TÄGLICHER BONUS!* {emoji}\n\n🎁 Du hast erhalten: *{bonus} Credits*\n🔥 Serie: *{streak} Tage*\n💰 Neues Guthaben: {balance} Credits\n\n✨ Komm morgen zurück, um deine Serie fortzusetzen!",
    daily_bonus_streak_broken:
      "{emoji} *TÄGLICHER BONUS!* {emoji}\n\n🎁 Du hast erhalten: *{bonus} Credits*\n💔 Deine Serie wurde unterbrochen!\n🔥 Neue Serie: *1 Tag*\n💰 Neues Guthaben: {balance} Credits\n\n✨ Melde dich täglich an, um eine größere Serie aufzubauen!",
    daily_bonus_already_claimed:
      "⏰ *Heute bereits beansprucht!*\n\n🔥 Aktuelle Serie: *{streak} Tage*\n💰 Dein Guthaben: {balance} Credits\n\n✨ Komm morgen für deinen nächsten Bonus!",
    daily_status:
      "📅 *TÄGLICHER LOGIN-STATUS*\n\n🔥 Aktuelle Serie: *{streak} Tage*\n📊 Gesamt Login-Tage: *{total} Tage*\n💰 Aktuelles Guthaben: {balance} Credits\n\n🎁 Nächster Bonus: *{nextBonus} Credits*\n⏰ {status}\n\n✨ Melde dich jeden Tag an, um deine Belohnungen zu maximieren!",
    daily_status_available: "Jetzt verfügbar! Verwende /start zum Beanspruchen",
    daily_status_claimed: "Heute bereits beansprucht. Komm morgen zurück!",
    help_daily: "/daily - Tägliche Login-Serie und Bonus anzeigen\n",
  },

  it: {
    start_welcome:
      "🎰 Benvenuto alla Slot Machine Credits!\nIl tuo saldo: {balance} Credits\n\n*Scegli la tua puntata:*",

    welcome_guide: `🎰 *BENVENUTO A CREDITS SLOT MACHINE!* 🎰

━━━━━━━━━━━━━━━━━━━━━
🎮 *COME GIOCARE*
━━━━━━━━━━━━━━━━━━━━━
Scegli la tua puntata (10, 50 o 100 crediti) e gira! Combina 3 simboli per vincere alla grande!

━━━━━━━━━━━━━━━━━━━━━
💰 *COME VINCERE*
━━━━━━━━━━━━━━━━━━━━━
🍒🍒🍒 - 4x la tua puntata (12.5% probabilità)
🍋🍋🍋 - 20x la tua puntata (0.8% probabilità)
⭐⭐⭐ - 40x la tua puntata (0.34% probabilità)
7️⃣7️⃣7️⃣ - 150x la tua puntata (0.1% probabilità)
🎰🎰🎰 - *JACKPOT GLOBALE!* (0.0125%)

━━━━━━━━━━━━━━━━━━━━━
🏆 *JACKPOT GLOBALE*
━━━━━━━━━━━━━━━━━━━━━
• L'1% di ogni scommessa fa crescere il jackpot
• Ottieni 🎰🎰🎰 per vincere TUTTO il montepremi!
• Controlla montepremi attuale: /jackpot

━━━━━━━━━━━━━━━━━━━━━
🏪 *NEGOZIO UPGRADE*
━━━━━━━━━━━━━━━━━━━━━
• Acquista upgrade per migliorare le tue probabilità!
• Aumenta probabilità di vittoria
• Ottieni moltiplicatori e assicurazione
• Accedi al negozio: /shop

━━━━━━━━━━━━━━━━━━━━━
⚡ *SISTEMA XP E LIVELLI*
━━━━━━━━━━━━━━━━━━━━━
• Guadagna XP ad ogni giro
• Sali di livello per bonus passivi
• Livelli più alti = ricompense maggiori!
• Visualizza profilo: /profile

━━━━━━━━━━━━━━━━━━━━━
🎯 *OBIETTIVI GIORNALIERI*
━━━━━━━━━━━━━━━━━━━━━
• Completa sfide giornaliere
• Guadagna XP e Crediti bonus
• Nuovi obiettivi ogni giorno!
• Controlla obiettivi: /goals

━━━━━━━━━━━━━━━━━━━━━
🔥 *BONUS ACCESSO GIORNALIERO*
━━━━━━━━━━━━━━━━━━━━━
• Accedi ogni giorno per crediti gratis
• Costruisci serie per bonus maggiori
• Non interrompere la tua serie!
• Controlla stato: /daily

━━━━━━━━━━━━━━━━━━━━━
🤝 *CONDIVIDI PER VINCERE CREDITI*
━━━━━━━━━━━━━━━━━━━━━
• Invita amici con il tuo link
• Tu e il tuo amico ricevete ricompense!
• Guadagna crediti + XP per referral
• Ottieni link: /invite

━━━━━━━━━━━━━━━━━━━━━
💎 *ACQUISTA PIÙ CREDITI*
━━━━━━━━━━━━━━━━━━━━━
• Acquista con Telegram Stars
• Ottieni crediti bonus su pacchetti grandi
• Pagamento sicuro e protetto
• Acquista ora: /buy

━━━━━━━━━━━━━━━━━━━━━

🎲 *Pronto a girare?* Usa i pulsanti qui sotto o digita /spin per iniziare!

💡 *Suggerimento:* Inizia con il bonus di accesso giornaliero e completa obiettivi per crediti gratis!`,
    help_title: "📜 *Elenco Comandi* 📜\n\n",
    help_start: "/start - Avvia il bot e visualizza il saldo\n",
    help_balance: "/balance - Visualizza il saldo attuale\n",
    help_buy: "/buy - Acquista crediti con Telegram Stars\n",
    help_info: "/info - Visualizza probabilità e premi\n",
    help_language: "/language - Cambia lingua\n",
    help_spin: "/spin <importo> - Gira la slot machine (es: /spin 10)\n",
    help_help: "/help - Visualizza questo messaggio di aiuto",

    balance_current: "💰 Il tuo saldo attuale è: {balance} Credits",

    buy_title: "💰 *Acquista Crediti* 💰\n\n",
    buy_packages:
      "Scegli un pacchetto di crediti:\n\n🌟 10 crediti = 1 Star\n⭐ 100 crediti = 10 Stars\n✨ 500 crediti = 45 Stars (10% bonus!)\n💫 1.000 crediti = 85 Stars (15% bonus!)",
    buy_button_10: "🌟 10 crediti (1 Star)",
    buy_button_100: "⭐ 100 crediti (10 Stars)",
    buy_button_500: "✨ 500 crediti (45 Stars)",
    buy_button_1000: "💫 1.000 crediti (85 Stars)",

    info_title: "📊 *Probabilità di Gioco* 📊\n\n",
    info_combinations: "*Combinazioni Vincenti:*\n\n",
    info_cherry:
      "🍒🍒🍒 - 4x la tua puntata\n├ Probabilità: 12,5% (1 su 8)\n└ Esempio: Puntata 10 → Vinci 40\n\n",
    info_lemon:
      "🍋🍋🍋 - 20x la tua puntata\n├ Probabilità: 0,8% (1 su 125)\n└ Esempio: Puntata 10 → Vinci 200\n\n",
    info_star:
      "⭐⭐⭐ - 40x la tua puntata\n├ Probabilità: 0,34% (1 su 296)\n└ Esempio: Puntata 10 → Vinci 400\n\n",
    info_seven:
      "7️⃣7️⃣7️⃣ - 150x la tua scommessa\n├ Probabilità: 0.1% (1 su 1,000)\n└ Esempio: Scommessa 10 → Vinci 1,500\n\n",
    info_jackpot:
      "🎰🎰🎰 JACKPOT GLOBALE - Vinci l'intero montepremi!\n├ Probabilità: 0.0125% (1 su 8,000)\n└ Esempio: Pool a 50,000 → Vinci 50,000\n\n",
    info_stats:
      "*Statistiche:*\n• Tasso di vittoria: ~13,7%\n• RTP (Ritorno al giocatore): ~91,5%\n• Vantaggio del banco: ~8,5%\n\n",
    info_disclaimer:
      "⚠️ *Nota:* I crediti non hanno valore in denaro.\nQuesto è un gioco di intrattenimento.",

    // Jackpot
    jackpot_title: "🎰 *JACKPOT GLOBALE* 🎰",
    jackpot_pool: "Pool Attuale: *{amount} Crediti*",
    jackpot_info:
      "Gira per vincere! L'1% di ogni scommessa fa crescere il montepremi.\nOttieni 🎰 | 🎰 | 🎰 per vincere tutto!",

    language_select:
      "🌍 *Seleziona Lingua* 🌍\n\nScegli la tua lingua preferita:",
    language_changed: "✅ Lingua cambiata in Italiano!",

    spin_insufficient:
      "❌ Saldo insufficiente!\n\nIl tuo saldo: {balance} Credits\nRichiesto: {bet} Credits",
    spin_spinning: `🎰 *GIRANDO...* 🎰
───────────────────
❓ | ❓ | ❓
───────────────────
📉 Calcolo del nuovo saldo...
💰 Vediamo la tua fortuna

 🎰 Controllo jackpot...`,
    spin_win: `🎉 *HAI VINTO!* 🎉
───────────────────
{board}
───────────────────
💸 Premio: *{reward} Credits*
💰 Nuovo saldo: {balance} Credits`,
    spin_lose: `💀 *HAI PERSO* 💀
───────────────────
{board}
───────────────────
📉 Perso: {bet} Credits
💰 Nuovo saldo: {balance} Credits`,

    payment_processing: "Elaborazione pagamento...",
    payment_error: "Errore nella creazione della fattura. Riprova.",
    payment_success:
      "✅ *Pagamento riuscito!*\n\nHai ricevuto *{credits} crediti*\n💰 Nuovo saldo: {balance} Credits\n\nBuona fortuna! 🎰",

    button_spin_10: "🔄 10",
    button_spin_50: "🔄 50",
    button_spin_100: "🔄 100",

    // Daily Bonus
    daily_bonus_claimed:
      "{emoji} *BONUS GIORNALIERO!* {emoji}\n\n🎁 Hai ricevuto: *{bonus} Credits*\n🔥 Serie: *{streak} giorni*\n💰 Nuovo saldo: {balance} Credits\n\n✨ Torna domani per continuare la tua serie!",
    daily_bonus_streak_broken:
      "{emoji} *BONUS GIORNALIERO!* {emoji}\n\n🎁 Hai ricevuto: *{bonus} Credits*\n💔 La tua serie è stata interrotta!\n🔥 Nuova serie: *1 giorno*\n💰 Nuovo saldo: {balance} Credits\n\n✨ Accedi ogni giorno per costruire una serie più grande!",
    daily_bonus_already_claimed:
      "⏰ *Già richiesto oggi!*\n\n🔥 Serie attuale: *{streak} giorni*\n💰 Il tuo saldo: {balance} Credits\n\n✨ Torna domani per il tuo prossimo bonus!",
    daily_status:
      "📅 *STATO ACCESSO GIORNALIERO*\n\n🔥 Serie attuale: *{streak} giorni*\n📊 Giorni totali di accesso: *{total} giorni*\n💰 Saldo attuale: {balance} Credits\n\n🎁 Prossimo bonus: *{nextBonus} Credits*\n⏰ {status}\n\n✨ Accedi ogni giorno per massimizzare le tue ricompense!",
    daily_status_available: "Disponibile ora! Usa /start per richiedere",
    daily_status_claimed: "Già richiesto oggi. Torna domani!",
    help_daily: "/daily - Visualizza serie di accesso giornaliero e bonus\n",
  },

  fr: {
    start_welcome:
      "🎰 Bienvenue à la Machine à Sous Credits!\nVotre solde: {balance} Credits\n\n*Choisissez votre mise:*",

    welcome_guide: `🎰 *BIENVENUE À CREDITS SLOT MACHINE!* 🎰

━━━━━━━━━━━━━━━━━━━━━
🎮 *COMMENT JOUER*
━━━━━━━━━━━━━━━━━━━━━
Choisissez votre mise (10, 50 ou 100 crédits) et tournez! Combinez 3 symboles pour gagner gros!

━━━━━━━━━━━━━━━━━━━━━
💰 *COMMENT GAGNER*
━━━━━━━━━━━━━━━━━━━━━
🍒🍒🍒 - 4x votre mise (12.5% chance)
🍋🍋🍋 - 20x votre mise (0.8% chance)
⭐⭐⭐ - 40x votre mise (0.34% chance)
7️⃣7️⃣7️⃣ - 150x votre mise (0.1% chance)
🎰🎰🎰 - *JACKPOT MONDIAL!* (0.0125%)

━━━━━━━━━━━━━━━━━━━━━
🏆 *JACKPOT MONDIAL*
━━━━━━━━━━━━━━━━━━━━━
• 1% de chaque mise fait grossir le jackpot
• Obtenez 🎰🎰🎰 pour gagner TOUTE la cagnotte!
• Vérifier cagnotte actuelle: /jackpot

━━━━━━━━━━━━━━━━━━━━━
🏪 *BOUTIQUE D'AMÉLIORATIONS*
━━━━━━━━━━━━━━━━━━━━━
• Achetez des améliorations pour booster vos chances!
• Augmentez probabilités de victoire
• Obtenez multiplicateurs & assurance
• Accéder boutique: /shop

━━━━━━━━━━━━━━━━━━━━━
⚡ *SYSTÈME XP & NIVEAUX*
━━━━━━━━━━━━━━━━━━━━━
• Gagnez XP à chaque tour
• Montez de niveau pour bonus passifs
• Niveaux plus élevés = récompenses plus grandes!
• Voir profil: /profile

━━━━━━━━━━━━━━━━━━━━━
🎯 *OBJECTIFS QUOTIDIENS*
━━━━━━━━━━━━━━━━━━━━━
• Complétez défis quotidiens
• Gagnez XP et Crédits bonus
• Nouveaux objectifs chaque jour!
• Vérifier objectifs: /goals

━━━━━━━━━━━━━━━━━━━━━
🔥 *BONUS CONNEXION QUOTIDIEN*
━━━━━━━━━━━━━━━━━━━━━
• Connectez-vous chaque jour pour crédits gratuits
• Construisez séries pour bonus plus grands
• Ne cassez pas votre série!
• Vérifier statut: /daily

━━━━━━━━━━━━━━━━━━━━━
🤝 *PARTAGEZ POUR GAGNER CRÉDITS*
━━━━━━━━━━━━━━━━━━━━━
• Invitez amis avec votre lien
• Vous et votre ami recevez récompenses!
• Gagnez crédits + XP par parrainage
• Obtenir lien: /invite

━━━━━━━━━━━━━━━━━━━━━
💎 *ACHETER PLUS DE CRÉDITS*
━━━━━━━━━━━━━━━━━━━━━
• Achetez avec Telegram Stars
• Obtenez crédits bonus sur grands packs
• Paiement sécurisé
• Acheter maintenant: /buy

━━━━━━━━━━━━━━━━━━━━━

🎲 *Prêt à tourner?* Utilisez les boutons ci-dessous ou tapez /spin pour commencer!

💡 *Astuce:* Commencez avec le bonus de connexion quotidien et complétez objectifs pour crédits gratuits!`,
    help_title: "📜 *Liste des Commandes* 📜\n\n",
    help_start: "/start - Démarrer le bot et voir le solde\n",
    help_balance: "/balance - Voir votre solde actuel\n",
    help_buy: "/buy - Acheter des crédits avec Telegram Stars\n",
    help_info: "/info - Voir les probabilités et les prix\n",
    help_language: "/language - Changer de langue\n",
    help_spin: "/spin <montant> - Tourner la machine à sous (ex: /spin 10)\n",
    help_help: "/help - Voir ce message d'aide",

    balance_current: "💰 Votre solde actuel est: {balance} Credits",

    buy_title: "💰 *Acheter des Crédits* 💰\n\n",
    buy_packages:
      "Choisissez un pack de crédits:\n\n🌟 10 crédits = 1 Star\n⭐ 100 crédits = 10 Stars\n✨ 500 crédits = 45 Stars (10% bonus!)\n💫 1.000 crédits = 85 Stars (15% bonus!)",
    buy_button_10: "🌟 10 crédits (1 Star)",
    buy_button_100: "⭐ 100 crédits (10 Stars)",
    buy_button_500: "✨ 500 crédits (45 Stars)",
    buy_button_1000: "💫 1.000 crédits (85 Stars)",

    info_title: "📊 *Probabilités du Jeu* 📊\n\n",
    info_combinations: "*Combinaisons Gagnantes:*\n\n",
    info_cherry:
      "🍒🍒🍒 - 4x votre mise\n├ Probabilité: 12,5% (1 sur 8)\n└ Exemple: Mise 10 → Gain 40\n\n",
    info_lemon:
      "🍋🍋🍋 - 20x votre mise\n├ Probabilité: 0,8% (1 sur 125)\n└ Exemple: Mise 10 → Gain 200\n\n",
    info_star:
      "⭐⭐⭐ - 40x votre mise\n├ Probabilité: 0,34% (1 sur 296)\n└ Exemple: Mise 10 → Gain 400\n\n",
    info_seven:
      "7️⃣7️⃣7️⃣ - 150x votre mise\n├ Probabilité : 0.1% (1 sur 1,000)\n└ Exemple : Mise 10 → Gain 1,500\n\n",
    info_jackpot:
      "🎰🎰🎰 JACKPOT MONDIAL - Gagnez toute la cagnotte !\n├ Probabilité : 0.0125% (1 sur 8,000)\n└ Exemple : Cagnotte à 50,000 → Gain 50,000\n\n",
    info_stats:
      "*Statistiques:*\n• Taux de victoire: ~13,7%\n• RTP (Retour au joueur): ~91,5%\n• Avantage de la maison: ~8,5%\n\n",
    info_disclaimer:
      "⚠️ *Note:* Les crédits n'ont pas de valeur monétaire.\nCeci est un jeu de divertissement.",

    // Jackpot
    jackpot_title: "🎰 *JACKPOT MONDIAL* 🎰",
    jackpot_pool: "Cagnotte Actuelle : *{amount} Crédits*",
    jackpot_info:
      "Tournez pour gagner ! 1% de chaque mise fait grossir la cagnotte.\nObtenez 🎰 | 🎰 | 🎰 pour tout gagner !",

    language_select:
      "🌍 *Sélectionner la Langue* 🌍\n\nChoisissez votre langue préférée:",
    language_changed: "✅ Langue changée en Français!",

    spin_insufficient:
      "❌ Solde insuffisant!\n\nVotre solde: {balance} Credits\nRequis: {bet} Credits",
    spin_spinning: `🎰 *TOURNE...* 🎰
───────────────────
❓ | ❓ | ❓
───────────────────
📉 Calcul de votre nouveau solde...
💰 Voyons votre chance

 🎰 Vérification du jackpot...`,
    spin_win: `🎉 *VOUS AVEZ GAGNÉ!* 🎉
───────────────────
{board}
───────────────────
💸 Récompense: *{reward} Credits*
💰 Nouveau solde: {balance} Credits`,
    spin_lose: `💀 *VOUS AVEZ PERDU* 💀
───────────────────
{board}
───────────────────
📉 Perdu: {bet} Credits
💰 Nouveau solde: {balance} Credits`,

    payment_processing: "Traitement du paiement...",
    payment_error: "Erreur lors de la création de la facture. Réessayez.",
    payment_success:
      "✅ *Paiement réussi!*\n\nVous avez reçu *{credits} crédits*\n💰 Nouveau solde: {balance} Credits\n\nBonne chance! 🎰",

    button_spin_10: "🔄 10",
    button_spin_50: "🔄 50",
    button_spin_100: "🔄 100",

    // Daily Bonus
    daily_bonus_claimed:
      "{emoji} *BONUS QUOTIDIEN!* {emoji}\n\n🎁 Vous avez reçu: *{bonus} Credits*\n🔥 Série: *{streak} jours*\n💰 Nouveau solde: {balance} Credits\n\n✨ Revenez demain pour continuer votre série!",
    daily_bonus_streak_broken:
      "{emoji} *BONUS QUOTIDIEN!* {emoji}\n\n🎁 Vous avez reçu: *{bonus} Credits*\n💔 Votre série a été interrompue!\n🔥 Nouvelle série: *1 jour*\n💰 Nouveau solde: {balance} Credits\n\n✨ Connectez-vous quotidiennement pour construire une plus grande série!",
    daily_bonus_already_claimed:
      "⏰ *Déjà réclamé aujourd'hui!*\n\n🔥 Série actuelle: *{streak} jours*\n💰 Votre solde: {balance} Credits\n\n✨ Revenez demain pour votre prochain bonus!",
    daily_status:
      "📅 *STATUT DE CONNEXION QUOTIDIENNE*\n\n🔥 Série actuelle: *{streak} jours*\n📊 Total de jours de connexion: *{total} jours*\n💰 Solde actuel: {balance} Credits\n\n🎁 Prochain bonus: *{nextBonus} Credits*\n⏰ {status}\n\n✨ Connectez-vous chaque jour pour maximiser vos récompenses!",
    daily_status_available:
      "Disponible maintenant! Utilisez /start pour réclamer",
    daily_status_claimed: "Déjà réclamé aujourd'hui. Revenez demain!",
    help_daily: "/daily - Voir la série de connexion quotidienne et le bonus\n",
  },

  ru: {
    start_welcome:
      "🎰 Добро пожаловать в игровой автомат Credits!\nВаш баланс: {balance} Credits\n\n*Выберите ставку:*",

    welcome_guide: `🎰 *ДОБРО ПОЖАЛОВАТЬ В CREDITS SLOT MACHINE!* 🎰

━━━━━━━━━━━━━━━━━━━━━
🎮 *КАК ИГРАТЬ*
━━━━━━━━━━━━━━━━━━━━━
Выберите ставку (10, 50 или 100 кредитов) и крутите! Совместите 3 символа для большого выигрыша!

━━━━━━━━━━━━━━━━━━━━━
💰 *КАК ВЫИГРАТЬ*
━━━━━━━━━━━━━━━━━━━━━
🍒🍒🍒 - 4x вашей ставки (12.5% шанс)
🍋🍋🍋 - 20x вашей ставки (0.8% шанс)
⭐⭐⭐ - 40x вашей ставки (0.34% шанс)
7️⃣7️⃣7️⃣ - 150x вашей ставки (0.1% шанс)
🎰🎰🎰 - *ГЛОБАЛЬНЫЙ ДЖЕКПОТ!* (0.0125%)

━━━━━━━━━━━━━━━━━━━━━
🏆 *ГЛОБАЛЬНЫЙ ДЖЕКПОТ*
━━━━━━━━━━━━━━━━━━━━━
• 1% от каждой ставки увеличивает джекпот
• Получите 🎰🎰🎰 чтобы выиграть ВЕСЬ банк!
• Проверить текущий банк: /jackpot

━━━━━━━━━━━━━━━━━━━━━
🏪 *МАГАЗИН УЛУЧШЕНИЙ*
━━━━━━━━━━━━━━━━━━━━━
• Покупайте улучшения для повышения шансов!
• Увеличивайте вероятности выигрыша
• Получайте множители и страховку
• Открыть магазин: /shop

━━━━━━━━━━━━━━━━━━━━━
⚡ *СИСТЕМА XP И УРОВНЕЙ*
━━━━━━━━━━━━━━━━━━━━━
• Зарабатывайте XP с каждым вращением
• Повышайте уровень для пассивных бонусов
• Выше уровень = больше наград!
• Посмотреть профиль: /profile

━━━━━━━━━━━━━━━━━━━━━
🎯 *ЕЖЕДНЕВНЫЕ ЦЕЛИ*
━━━━━━━━━━━━━━━━━━━━━
• Выполняйте ежедневные задания
• Зарабатывайте бонусные XP и Кредиты
• Новые цели каждый день!
• Проверить цели: /goals

━━━━━━━━━━━━━━━━━━━━━
🔥 *ЕЖЕДНЕВНЫЙ БОНУС ВХОДА*
━━━━━━━━━━━━━━━━━━━━━
• Заходите ежедневно за бесплатные кредиты
• Стройте серии для больших бонусов
• Не прерывайте свою серию!
• Проверить статус: /daily

━━━━━━━━━━━━━━━━━━━━━
🤝 *ДЕЛИТЕСЬ ДЛЯ КРЕДИТОВ*
━━━━━━━━━━━━━━━━━━━━━
• Приглашайте друзей по вашей ссылке
• Вы и друг получаете награды!
• Зарабатывайте кредиты + XP за реферала
• Получить ссылку: /invite

━━━━━━━━━━━━━━━━━━━━━
💎 *КУПИТЬ БОЛЬШЕ КРЕДИТОВ*
━━━━━━━━━━━━━━━━━━━━━
• Покупайте за Telegram Stars
• Получайте бонусные кредиты в больших пакетах
• Безопасная оплата
• Купить сейчас: /buy

━━━━━━━━━━━━━━━━━━━━━

🎲 *Готовы крутить?* Используйте кнопки ниже или введите /spin чтобы начать!

💡 *Совет:* Начните с ежедневного бонуса входа и выполняйте цели для бесплатных кредитов!`,
    help_title: "📜 *Список Команд* 📜\n\n",
    help_start: "/start - Запустить бота и посмотреть баланс\n",
    help_balance: "/balance - Посмотреть текущий баланс\n",
    help_buy: "/buy - Купить кредиты за Telegram Stars\n",
    help_info: "/info - Посмотреть шансы и призы\n",
    help_language: "/language - Изменить язык\n",
    help_spin: "/spin <сумма> - Крутить автомат (напр: /spin 10)\n",
    help_help: "/help - Посмотреть это сообщение",

    balance_current: "💰 Ваш текущий баланс: {balance} Credits",

    buy_title: "💰 *Купить Кредиты* 💰\n\n",
    buy_packages:
      "Выберите пакет кредитов:\n\n🌟 10 кредитов = 1 Star\n⭐ 100 кредитов = 10 Stars\n✨ 500 кредитов = 45 Stars (10% бонус!)\n💫 1.000 кредитов = 85 Stars (15% бонус!)",
    buy_button_10: "🌟 10 кредитов (1 Star)",
    buy_button_100: "⭐ 100 кредитов (10 Stars)",
    buy_button_500: "✨ 500 кредитов (45 Stars)",
    buy_button_1000: "💫 1.000 кредитов (85 Stars)",

    info_title: "📊 *Шансы в Игре* 📊\n\n",
    info_combinations: "*Выигрышные Комбинации:*\n\n",
    info_cherry:
      "🍒🍒🍒 - 4x вашей ставки\n├ Вероятность: 12,5% (1 из 8)\n└ Пример: Ставка 10 → Выигрыш 40\n\n",
    info_lemon:
      "🍋🍋🍋 - 20x вашей ставки\n├ Вероятность: 0,8% (1 из 125)\n└ Пример: Ставка 10 → Выигрыш 200\n\n",
    info_star:
      "⭐⭐⭐ - 40x вашей ставки\n├ Вероятность: 0,34% (1 из 296)\n└ Пример: Ставка 10 → Выигрыш 400\n\n",
    info_seven:
      "7️⃣7️⃣7️⃣ - 150x вашу ставку\n├ Вероятность: 0.1% (1 из 1,000)\n└ Пример: Ставка 10 → Выигрыш 1,500\n\n",
    info_jackpot:
      "🎰🎰🎰 ГЛОБАЛЬНЫЙ ДЖЕКПОТ - Выиграйте весь банк!\n├ Вероятность: 0.0125% (1 из 8,000)\n└ Пример: Банк 50,000 → Выигрыш 50,000\n\n",
    info_stats:
      "*Статистика:*\n• Процент побед: ~13,7%\n• RTP (Возврат игроку): ~91,5%\n• Преимущество казино: ~8,5%\n\n",
    info_disclaimer:
      "⚠️ *Примечание:* Кредиты не имеют денежной ценности.\nЭто развлекательная игра.",

    // Jackpot
    jackpot_title: "🎰 *ГЛОБАЛЬНЫЙ ДЖЕКПОТ* 🎰",
    jackpot_pool: "Текущий банк: *{amount} кредитов*",
    jackpot_info:
      "Крутите, чтобы выиграть! 1% от каждой ставки увеличивает банк.\nПолучите 🎰 | 🎰 | 🎰, чтобы забрать всё!",

    language_select: "🌍 *Выбрать Язык* 🌍\n\nВыберите предпочитаемый язык:",
    language_changed: "✅ Язык изменен на Русский!",

    spin_insufficient:
      "❌ Недостаточно средств!\n\nВаш баланс: {balance} Credits\nТребуется: {bet} Credits",
    spin_spinning: `🎰 *КРУТИМ...* 🎰
───────────────────
❓ | ❓ | ❓
───────────────────
📉 Рассчитываем ваш новый баланс...
💰 Посмотрим на вашу удачу

 🎰 Проверка джекпота...`,
    spin_win: `🎉 *ВЫ ВЫИГРАЛИ!* 🎉
───────────────────
{board}
───────────────────
💸 Награда: *{reward} Credits*
💰 Новый баланс: {balance} Credits`,
    spin_lose: `💀 *ВЫ ПРОИГРАЛИ* 💀
───────────────────
{board}
───────────────────
📉 Потеряно: {bet} Credits
💰 Новый баланс: {balance} Credits`,

    payment_processing: "Обработка платежа...",
    payment_error: "Ошибка создания счета. Попробуйте снова.",
    payment_success:
      "✅ *Платеж успешен!*\n\nВы получили *{credits} кредитов*\n💰 Новый баланс: {balance} Credits\n\nУдачи! 🎰",

    button_spin_10: "🔄 10",
    button_spin_50: "🔄 50",
    button_spin_100: "🔄 100",

    // Daily Bonus
    daily_bonus_claimed:
      "{emoji} *ЕЖЕДНЕВНЫЙ БОНУС!* {emoji}\n\n🎁 Вы получили: *{bonus} Credits*\n🔥 Серия: *{streak} дней*\n💰 Новый баланс: {balance} Credits\n\n✨ Возвращайтесь завтра, чтобы продолжить серию!",
    daily_bonus_streak_broken:
      "{emoji} *ЕЖЕДНЕВНЫЙ БОНУС!* {emoji}\n\n🎁 Вы получили: *{bonus} Credits*\n💔 Ваша серия прервалась!\n🔥 Новая серия: *1 день*\n💰 Новый баланс: {balance} Credits\n\n✨ Заходите ежедневно, чтобы построить большую серию!",
    daily_bonus_already_claimed:
      "⏰ *Уже получено сегодня!*\n\n🔥 Текущая серия: *{streak} дней*\n💰 Ваш баланс: {balance} Credits\n\n✨ Возвращайтесь завтра за следующим бонусом!",
    daily_status:
      "📅 *СТАТУС ЕЖЕДНЕВНОГО ВХОДА*\n\n🔥 Текущая серия: *{streak} дней*\n📊 Всего дней входа: *{total} дней*\n💰 Текущий баланс: {balance} Credits\n\n🎁 Следующий бонус: *{nextBonus} Credits*\n⏰ {status}\n\n✨ Заходите каждый день, чтобы максимизировать награды!",
    daily_status_available: "Доступно сейчас! Используйте /start для получения",
    daily_status_claimed: "Уже получено сегодня. Возвращайтесь завтра!",
    help_daily: "/daily - Посмотреть серию ежедневного входа и бонус\n",
  },
};

// Helper function to get translation with placeholder replacement
export function t(
  lang: Language,
  key: string,
  params?: Record<string, any>
): string {
  let text = translations[lang]?.[key] || translations["en"][key] || key;

  if (params) {
    Object.keys(params).forEach((param) => {
      text = text.replace(new RegExp(`{${param}}`, "g"), String(params[param]));
    });
  }

  return text;
}

// Bot menu commands for each language
export const menuCommands: Record<
  Language,
  { command: string; description: string }[]
> = {
  en: [
    { command: "start", description: "🎮 Start playing" },
    { command: "play", description: "🎰 Open spin menu" },
    { command: "spin", description: "🎲 Quick spin (/spin 100)" },
    { command: "balance", description: "💰 Check credits" },
    { command: "daily", description: "🎁 Daily bonus" },
    { command: "jackpot", description: "🏆 View jackpot" },
    { command: "shop", description: "🏪 Buy upgrades" },
    { command: "profile", description: "👤 Your profile" },
    { command: "goals", description: "🎯 Daily goals" },
    { command: "invite", description: "👥 Invite friends" },
    { command: "account", description: "📊 Account info" },
    { command: "game", description: "🎲 Game info" },
    { command: "info", description: "ℹ️ Bot info" },
    { command: "settings", description: "⚙️ Settings" },
    { command: "language", description: "🌍 Change language" },
  ],
  es: [
    { command: "start", description: "🎮 Empezar a jugar" },
    { command: "play", description: "🎰 Menú de giros" },
    { command: "spin", description: "🎲 Giro rápido (/spin 100)" },
    { command: "balance", description: "💰 Ver créditos" },
    { command: "daily", description: "🎁 Bonus diario" },
    { command: "jackpot", description: "🏆 Ver jackpot" },
    { command: "shop", description: "🏪 Comprar mejoras" },
    { command: "profile", description: "👤 Tu perfil" },
    { command: "goals", description: "🎯 Metas diarias" },
    { command: "invite", description: "👥 Invitar amigos" },
    { command: "account", description: "📊 Info de cuenta" },
    { command: "game", description: "🎲 Info del juego" },
    { command: "info", description: "ℹ️ Info del bot" },
    { command: "settings", description: "⚙️ Configuración" },
    { command: "language", description: "🌍 Cambiar idioma" },
  ],
  de: [
    { command: "start", description: "🎮 Spiel starten" },
    { command: "play", description: "🎰 Spin-Menü öffnen" },
    { command: "spin", description: "🎲 Schnelldrehen (/spin 100)" },
    { command: "balance", description: "💰 Guthaben anzeigen" },
    { command: "daily", description: "🎁 Täglicher Bonus" },
    { command: "jackpot", description: "🏆 Jackpot anzeigen" },
    { command: "shop", description: "🏪 Upgrades kaufen" },
    { command: "profile", description: "👤 Dein Profil" },
    { command: "goals", description: "🎯 Tägliche Ziele" },
    { command: "invite", description: "👥 Freunde einladen" },
    { command: "account", description: "📊 Konto-Info" },
    { command: "game", description: "🎲 Spiel-Info" },
    { command: "info", description: "ℹ️ Bot-Info" },
    { command: "settings", description: "⚙️ Einstellungen" },
    { command: "language", description: "🌍 Sprache ändern" },
  ],
  fr: [
    { command: "start", description: "🎮 Commencer à jouer" },
    { command: "play", description: "🎰 Menu de rotation" },
    { command: "spin", description: "🎲 Rotation rapide (/spin 100)" },
    { command: "balance", description: "💰 Voir crédits" },
    { command: "daily", description: "🎁 Bonus quotidien" },
    { command: "jackpot", description: "🏆 Voir jackpot" },
    { command: "shop", description: "🏪 Acheter améliorations" },
    { command: "profile", description: "👤 Ton profil" },
    { command: "goals", description: "🎯 Objectifs quotidiens" },
    { command: "invite", description: "👥 Inviter des amis" },
    { command: "account", description: "📊 Info du compte" },
    { command: "game", description: "🎲 Info du jeu" },
    { command: "info", description: "ℹ️ Info du bot" },
    { command: "settings", description: "⚙️ Paramètres" },
    { command: "language", description: "🌍 Changer de langue" },
  ],
  it: [
    { command: "start", description: "🎮 Inizia a giocare" },
    { command: "play", description: "🎰 Menu giri" },
    { command: "spin", description: "🎲 Giro veloce (/spin 100)" },
    { command: "balance", description: "💰 Vedi crediti" },
    { command: "daily", description: "🎁 Bonus giornaliero" },
    { command: "jackpot", description: "🏆 Vedi jackpot" },
    { command: "shop", description: "🏪 Compra upgrade" },
    { command: "profile", description: "👤 Il tuo profilo" },
    { command: "goals", description: "🎯 Obiettivi giornalieri" },
    { command: "invite", description: "👥 Invita amici" },
    { command: "account", description: "📊 Info account" },
    { command: "game", description: "🎲 Info gioco" },
    { command: "info", description: "ℹ️ Info bot" },
    { command: "settings", description: "⚙️ Impostazioni" },
    { command: "language", description: "🌍 Cambia lingua" },
  ],
  ru: [
    { command: "start", description: "🎮 Начать игру" },
    { command: "play", description: "🎰 Меню вращений" },
    { command: "spin", description: "🎲 Быстрый спин (/spin 100)" },
    { command: "balance", description: "💰 Проверить кредиты" },
    { command: "daily", description: "🎁 Ежедневный бонус" },
    { command: "jackpot", description: "🏆 Посмотреть джекпот" },
    { command: "shop", description: "🏪 Купить улучшения" },
    { command: "profile", description: "👤 Твой профиль" },
    { command: "goals", description: "🎯 Ежедневные цели" },
    { command: "invite", description: "👥 Пригласить друзей" },
    { command: "account", description: "📊 Инфо аккаунта" },
    { command: "game", description: "🎲 Инфо игры" },
    { command: "info", description: "ℹ️ Инфо бота" },
    { command: "settings", description: "⚙️ Настройки" },
    { command: "language", description: "🌍 Сменить язык" },
  ],
};
