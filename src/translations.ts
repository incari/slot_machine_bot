export type Language = 'en' | 'es' | 'de' | 'it' | 'fr' | 'ru';

interface Translation {
  [key: string]: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    // Commands
    start_welcome: "🎰 Welcome to the TON Slot Machine!\nYour balance: {balance} TON\n\n*Choose your bet:*",
    help_title: "📜 *Command List* 📜\n\n",
    help_start: "/start - Start the bot and view balance\n",
    help_balance: "/balance - View your current balance\n",
    help_buy: "/buy - Buy credits with Telegram Stars\n",
    help_info: "/info - View odds and prizes\n",
    help_language: "/language - Change language\n",
    help_spin: "/spin <amount> - Spin the slot machine (e.g., /spin 10)\n",
    help_help: "/help - View this help message",
    
    // Balance
    balance_current: "💰 Your current balance is: {balance} TON",
    
    // Buy credits
    buy_title: "💰 *Buy Credits* 💰\n\n",
    buy_packages: "Choose a credit package:\n\n🌟 10 credits = 1 Star\n⭐ 100 credits = 10 Stars\n✨ 500 credits = 45 Stars (10% bonus!)\n💫 1,000 credits = 85 Stars (15% bonus!)",
    buy_button_10: "🌟 10 credits (1 Star)",
    buy_button_100: "⭐ 100 credits (10 Stars)",
    buy_button_500: "✨ 500 credits (45 Stars)",
    buy_button_1000: "💫 1,000 credits (85 Stars)",
    
    // Info
    info_title: "📊 *Game Odds* 📊\n\n",
    info_combinations: "*Winning Combinations:*\n\n",
    info_cherry: "🍒🍒🍒 - 4x your bet\n├ Probability: 12.5% (1 in 8)\n└ Example: Bet 10 → Win 40\n\n",
    info_lemon: "🍋🍋🍋 - 20x your bet\n├ Probability: 0.8% (1 in 125)\n└ Example: Bet 10 → Win 200\n\n",
    info_star: "⭐⭐⭐ - 40x your bet\n├ Probability: 0.34% (1 in 296)\n└ Example: Bet 10 → Win 400\n\n",
    info_seven: "7️⃣7️⃣7️⃣ - 150x your bet\n├ Probability: 0.0125% (1 in 8,000)\n└ Example: Bet 10 → Win 1,500\n\n",
    info_jackpot: "🇧🇦🇷 JACKPOT - 100x your bet\n├ Probability: 0.1% (1 in 1,000)\n└ Example: Bet 10 → Win 1,000\n\n",
    info_stats: "*Statistics:*\n• Win rate: ~13.7%\n• RTP (Return to player): ~91.5%\n• House edge: ~8.5%\n\n",
    info_disclaimer: "⚠️ *Note:* Credits have no cash value.\nThis is an entertainment game.",
    
    // Language
    language_select: "🌍 *Select Language* 🌍\n\nChoose your preferred language:",
    language_changed: "✅ Language changed to English!",
    
    // Spin
    spin_insufficient: "❌ Insufficient balance!\n\nYour balance: {balance} TON\nRequired: {bet} TON",
    spin_spinning: "🎰 *SPINNING...* 🎰\n──────────────\n❓ | ❓ | ❓\n──────────────\n📉 Calculating your new balance...\n💰 Let's see your luck",
    spin_win: "🎉 *YOU WON!* 🎉\n──────────────\n{board}\n──────────────\n💸 Reward: *{reward} TON*\n💰 New balance: {balance} TON",
    spin_lose: "💀 *YOU LOST* 💀\n──────────────\n{board}\n──────────────\n📉 Lost: {bet} TON\n💰 New balance: {balance} TON",
    
    // Payment
    payment_processing: "Processing payment...",
    payment_error: "Error creating invoice. Try again.",
    payment_success: "✅ *Payment successful!*\n\nYou received *{credits} credits*\n💰 New balance: {balance} TON\n\nGood luck! 🎰",
    
    // Buttons
    button_spin_10: "🔄 10",
    button_spin_50: "🔄 50",
    button_spin_100: "🔄 100",
  },
  
  es: {
    // Commands
    start_welcome: "🎰 ¡Bienvenido a la tragamonedas TON!\nTu balance: {balance} TON\n\n*Elige tu apuesta:*",
    help_title: "📜 *Lista de Comandos* 📜\n\n",
    help_start: "/start - Iniciar el bot y ver balance\n",
    help_balance: "/balance - Ver tu saldo actual\n",
    help_buy: "/buy - Comprar créditos con Telegram Stars\n",
    help_info: "/info - Ver probabilidades y premios\n",
    help_language: "/language - Cambiar idioma\n",
    help_spin: "/spin <cantidad> - Girar la tragamonedas (ej: /spin 10)\n",
    help_help: "/help - Ver este mensaje de ayuda",
    
    balance_current: "💰 Tu balance actual es: {balance} TON",
    
    buy_title: "💰 *Comprar Créditos* 💰\n\n",
    buy_packages: "Elige un paquete de créditos:\n\n🌟 10 créditos = 1 Star\n⭐ 100 créditos = 10 Stars\n✨ 500 créditos = 45 Stars (¡10% bonus!)\n💫 1,000 créditos = 85 Stars (¡15% bonus!)",
    buy_button_10: "🌟 10 créditos (1 Star)",
    buy_button_100: "⭐ 100 créditos (10 Stars)",
    buy_button_500: "✨ 500 créditos (45 Stars)",
    buy_button_1000: "💫 1,000 créditos (85 Stars)",
    
    info_title: "📊 *Probabilidades del Juego* 📊\n\n",
    info_combinations: "*Combinaciones Ganadoras:*\n\n",
    info_cherry: "🍒🍒🍒 - 4x tu apuesta\n├ Probabilidad: 12.5% (1 de cada 8)\n└ Ejemplo: Apuesta 10 → Ganas 40\n\n",
    info_lemon: "🍋🍋🍋 - 20x tu apuesta\n├ Probabilidad: 0.8% (1 de cada 125)\n└ Ejemplo: Apuesta 10 → Ganas 200\n\n",
    info_star: "⭐⭐⭐ - 40x tu apuesta\n├ Probabilidad: 0.34% (1 de cada 296)\n└ Ejemplo: Apuesta 10 → Ganas 400\n\n",
    info_seven: "7️⃣7️⃣7️⃣ - 150x tu apuesta\n├ Probabilidad: 0.0125% (1 de cada 8,000)\n└ Ejemplo: Apuesta 10 → Ganas 1,500\n\n",
    info_jackpot: "🇧🇦🇷 JACKPOT - 100x tu apuesta\n├ Probabilidad: 0.1% (1 de cada 1,000)\n└ Ejemplo: Apuesta 10 → Ganas 1,000\n\n",
    info_stats: "*Estadísticas:*\n• Tasa de victoria: ~13.7%\n• RTP (Retorno al jugador): ~91.5%\n• Ventaja de la casa: ~8.5%\n\n",
    info_disclaimer: "⚠️ *Nota:* Los créditos no tienen valor en efectivo.\nEste es un juego de entretenimiento.",
    
    language_select: "🌍 *Seleccionar Idioma* 🌍\n\nElige tu idioma preferido:",
    language_changed: "✅ ¡Idioma cambiado a Español!",
    
    spin_insufficient: "❌ ¡Saldo insuficiente!\n\nTu balance: {balance} TON\nRequerido: {bet} TON",
    spin_spinning: "🎰 *GIRANDO...* 🎰\n──────────────\n❓ | ❓ | ❓\n──────────────\n📉 Calculando tu nuevo balance...\n💰 Veamos tu suerte",
    spin_win: "🎉 *¡GANASTE!* 🎉\n──────────────\n{board}\n──────────────\n💸 Recompensa: *{reward} TON*\n💰 Nuevo balance: {balance} TON",
    spin_lose: "💀 *PERDISTE* 💀\n──────────────\n{board}\n──────────────\n📉 Perdiste: {bet} TON\n💰 Nuevo balance: {balance} TON",
    
    payment_processing: "Procesando pago...",
    payment_error: "Error al crear la factura. Intenta de nuevo.",
    payment_success: "✅ *¡Pago exitoso!*\n\nHas recibido *{credits} créditos*\n💰 Nuevo balance: {balance} TON\n\n¡Buena suerte! 🎰",
    
    button_spin_10: "🔄 10",
    button_spin_50: "🔄 50",
    button_spin_100: "🔄 100",
  },
  
  de: {
    start_welcome: "🎰 Willkommen beim TON Spielautomaten!\nDein Guthaben: {balance} TON\n\n*Wähle deinen Einsatz:*",
    help_title: "📜 *Befehlsliste* 📜\n\n",
    help_start: "/start - Bot starten und Guthaben anzeigen\n",
    help_balance: "/balance - Aktuelles Guthaben anzeigen\n",
    help_buy: "/buy - Credits mit Telegram Stars kaufen\n",
    help_info: "/info - Gewinnchancen und Preise anzeigen\n",
    help_language: "/language - Sprache ändern\n",
    help_spin: "/spin <betrag> - Spielautomat drehen (z.B.: /spin 10)\n",
    help_help: "/help - Diese Hilfenachricht anzeigen",
    
    balance_current: "💰 Dein aktuelles Guthaben ist: {balance} TON",
    
    buy_title: "💰 *Credits kaufen* 💰\n\n",
    buy_packages: "Wähle ein Credit-Paket:\n\n🌟 10 Credits = 1 Star\n⭐ 100 Credits = 10 Stars\n✨ 500 Credits = 45 Stars (10% Bonus!)\n💫 1.000 Credits = 85 Stars (15% Bonus!)",
    buy_button_10: "🌟 10 Credits (1 Star)",
    buy_button_100: "⭐ 100 Credits (10 Stars)",
    buy_button_500: "✨ 500 Credits (45 Stars)",
    buy_button_1000: "💫 1.000 Credits (85 Stars)",
    
    info_title: "📊 *Spielchancen* 📊\n\n",
    info_combinations: "*Gewinnkombinationen:*\n\n",
    info_cherry: "🍒🍒🍒 - 4x dein Einsatz\n├ Wahrscheinlichkeit: 12,5% (1 von 8)\n└ Beispiel: Einsatz 10 → Gewinn 40\n\n",
    info_lemon: "🍋🍋🍋 - 20x dein Einsatz\n├ Wahrscheinlichkeit: 0,8% (1 von 125)\n└ Beispiel: Einsatz 10 → Gewinn 200\n\n",
    info_star: "⭐⭐⭐ - 40x dein Einsatz\n├ Wahrscheinlichkeit: 0,34% (1 von 296)\n└ Beispiel: Einsatz 10 → Gewinn 400\n\n",
    info_seven: "7️⃣7️⃣7️⃣ - 150x dein Einsatz\n├ Wahrscheinlichkeit: 0,0125% (1 von 8.000)\n└ Beispiel: Einsatz 10 → Gewinn 1.500\n\n",
    info_jackpot: "🇧🇦🇷 JACKPOT - 100x dein Einsatz\n├ Wahrscheinlichkeit: 0,1% (1 von 1.000)\n└ Beispiel: Einsatz 10 → Gewinn 1.000\n\n",
    info_stats: "*Statistiken:*\n• Gewinnrate: ~13,7%\n• RTP (Return to Player): ~91,5%\n• Hausvorteil: ~8,5%\n\n",
    info_disclaimer: "⚠️ *Hinweis:* Credits haben keinen Barwert.\nDies ist ein Unterhaltungsspiel.",
    
    language_select: "🌍 *Sprache wählen* 🌍\n\nWähle deine bevorzugte Sprache:",
    language_changed: "✅ Sprache auf Deutsch geändert!",
    
    spin_insufficient: "❌ Unzureichendes Guthaben!\n\nDein Guthaben: {balance} TON\nBenötigt: {bet} TON",
    spin_spinning: "🎰 *DREHT...* 🎰\n──────────────\n❓ | ❓ | ❓\n──────────────\n📉 Berechne dein neues Guthaben...\n💰 Mal sehen, was das Glück bringt",
    spin_win: "🎉 *GEWONNEN!* 🎉\n──────────────\n{board}\n──────────────\n💸 Gewinn: *{reward} TON*\n💰 Neues Guthaben: {balance} TON",
    spin_lose: "💀 *VERLOREN* 💀\n──────────────\n{board}\n──────────────\n📉 Verlust: {bet} TON\n💰 Neues Guthaben: {balance} TON",
    
    payment_processing: "Zahlung wird verarbeitet...",
    payment_error: "Fehler beim Erstellen der Rechnung. Versuche es erneut.",
    payment_success: "✅ *Zahlung erfolgreich!*\n\nDu hast *{credits} Credits* erhalten\n💰 Neues Guthaben: {balance} TON\n\nViel Glück! 🎰",
    
    button_spin_10: "🔄 10",
    button_spin_50: "🔄 50",
    button_spin_100: "🔄 100",
  },
  
  it: {
    start_welcome: "🎰 Benvenuto alla Slot Machine TON!\nIl tuo saldo: {balance} TON\n\n*Scegli la tua puntata:*",
    help_title: "📜 *Elenco Comandi* 📜\n\n",
    help_start: "/start - Avvia il bot e visualizza il saldo\n",
    help_balance: "/balance - Visualizza il saldo attuale\n",
    help_buy: "/buy - Acquista crediti con Telegram Stars\n",
    help_info: "/info - Visualizza probabilità e premi\n",
    help_language: "/language - Cambia lingua\n",
    help_spin: "/spin <importo> - Gira la slot machine (es: /spin 10)\n",
    help_help: "/help - Visualizza questo messaggio di aiuto",
    
    balance_current: "💰 Il tuo saldo attuale è: {balance} TON",
    
    buy_title: "💰 *Acquista Crediti* 💰\n\n",
    buy_packages: "Scegli un pacchetto di crediti:\n\n🌟 10 crediti = 1 Star\n⭐ 100 crediti = 10 Stars\n✨ 500 crediti = 45 Stars (10% bonus!)\n💫 1.000 crediti = 85 Stars (15% bonus!)",
    buy_button_10: "🌟 10 crediti (1 Star)",
    buy_button_100: "⭐ 100 crediti (10 Stars)",
    buy_button_500: "✨ 500 crediti (45 Stars)",
    buy_button_1000: "💫 1.000 crediti (85 Stars)",
    
    info_title: "📊 *Probabilità di Gioco* 📊\n\n",
    info_combinations: "*Combinazioni Vincenti:*\n\n",
    info_cherry: "🍒🍒🍒 - 4x la tua puntata\n├ Probabilità: 12,5% (1 su 8)\n└ Esempio: Puntata 10 → Vinci 40\n\n",
    info_lemon: "🍋🍋🍋 - 20x la tua puntata\n├ Probabilità: 0,8% (1 su 125)\n└ Esempio: Puntata 10 → Vinci 200\n\n",
    info_star: "⭐⭐⭐ - 40x la tua puntata\n├ Probabilità: 0,34% (1 su 296)\n└ Esempio: Puntata 10 → Vinci 400\n\n",
    info_seven: "7️⃣7️⃣7️⃣ - 150x la tua puntata\n├ Probabilità: 0,0125% (1 su 8.000)\n└ Esempio: Puntata 10 → Vinci 1.500\n\n",
    info_jackpot: "🇧🇦🇷 JACKPOT - 100x la tua puntata\n├ Probabilità: 0,1% (1 su 1.000)\n└ Esempio: Puntata 10 → Vinci 1.000\n\n",
    info_stats: "*Statistiche:*\n• Tasso di vittoria: ~13,7%\n• RTP (Ritorno al giocatore): ~91,5%\n• Vantaggio del banco: ~8,5%\n\n",
    info_disclaimer: "⚠️ *Nota:* I crediti non hanno valore in denaro.\nQuesto è un gioco di intrattenimento.",
    
    language_select: "🌍 *Seleziona Lingua* 🌍\n\nScegli la tua lingua preferita:",
    language_changed: "✅ Lingua cambiata in Italiano!",
    
    spin_insufficient: "❌ Saldo insufficiente!\n\nIl tuo saldo: {balance} TON\nRichiesto: {bet} TON",
    spin_spinning: "🎰 *GIRANDO...* 🎰\n──────────────\n❓ | ❓ | ❓\n──────────────\n📉 Calcolo del nuovo saldo...\n💰 Vediamo la tua fortuna",
    spin_win: "🎉 *HAI VINTO!* 🎉\n──────────────\n{board}\n──────────────\n💸 Premio: *{reward} TON*\n💰 Nuovo saldo: {balance} TON",
    spin_lose: "💀 *HAI PERSO* 💀\n──────────────\n{board}\n──────────────\n📉 Perso: {bet} TON\n💰 Nuovo saldo: {balance} TON",
    
    payment_processing: "Elaborazione pagamento...",
    payment_error: "Errore nella creazione della fattura. Riprova.",
    payment_success: "✅ *Pagamento riuscito!*\n\nHai ricevuto *{credits} crediti*\n💰 Nuovo saldo: {balance} TON\n\nBuona fortuna! 🎰",
    
    button_spin_10: "🔄 10",
    button_spin_50: "🔄 50",
    button_spin_100: "🔄 100",
  },
  
  fr: {
    start_welcome: "🎰 Bienvenue à la Machine à Sous TON!\nVotre solde: {balance} TON\n\n*Choisissez votre mise:*",
    help_title: "📜 *Liste des Commandes* 📜\n\n",
    help_start: "/start - Démarrer le bot et voir le solde\n",
    help_balance: "/balance - Voir votre solde actuel\n",
    help_buy: "/buy - Acheter des crédits avec Telegram Stars\n",
    help_info: "/info - Voir les probabilités et les prix\n",
    help_language: "/language - Changer de langue\n",
    help_spin: "/spin <montant> - Tourner la machine à sous (ex: /spin 10)\n",
    help_help: "/help - Voir ce message d'aide",
    
    balance_current: "💰 Votre solde actuel est: {balance} TON",
    
    buy_title: "💰 *Acheter des Crédits* 💰\n\n",
    buy_packages: "Choisissez un pack de crédits:\n\n🌟 10 crédits = 1 Star\n⭐ 100 crédits = 10 Stars\n✨ 500 crédits = 45 Stars (10% bonus!)\n💫 1.000 crédits = 85 Stars (15% bonus!)",
    buy_button_10: "🌟 10 crédits (1 Star)",
    buy_button_100: "⭐ 100 crédits (10 Stars)",
    buy_button_500: "✨ 500 crédits (45 Stars)",
    buy_button_1000: "💫 1.000 crédits (85 Stars)",
    
    info_title: "📊 *Probabilités du Jeu* 📊\n\n",
    info_combinations: "*Combinaisons Gagnantes:*\n\n",
    info_cherry: "🍒🍒🍒 - 4x votre mise\n├ Probabilité: 12,5% (1 sur 8)\n└ Exemple: Mise 10 → Gain 40\n\n",
    info_lemon: "🍋🍋🍋 - 20x votre mise\n├ Probabilité: 0,8% (1 sur 125)\n└ Exemple: Mise 10 → Gain 200\n\n",
    info_star: "⭐⭐⭐ - 40x votre mise\n├ Probabilité: 0,34% (1 sur 296)\n└ Exemple: Mise 10 → Gain 400\n\n",
    info_seven: "7️⃣7️⃣7️⃣ - 150x votre mise\n├ Probabilité: 0,0125% (1 sur 8.000)\n└ Exemple: Mise 10 → Gain 1.500\n\n",
    info_jackpot: "🇧🇦🇷 JACKPOT - 100x votre mise\n├ Probabilité: 0,1% (1 sur 1.000)\n└ Exemple: Mise 10 → Gain 1.000\n\n",
    info_stats: "*Statistiques:*\n• Taux de victoire: ~13,7%\n• RTP (Retour au joueur): ~91,5%\n• Avantage de la maison: ~8,5%\n\n",
    info_disclaimer: "⚠️ *Note:* Les crédits n'ont pas de valeur monétaire.\nCeci est un jeu de divertissement.",
    
    language_select: "🌍 *Sélectionner la Langue* 🌍\n\nChoisissez votre langue préférée:",
    language_changed: "✅ Langue changée en Français!",
    
    spin_insufficient: "❌ Solde insuffisant!\n\nVotre solde: {balance} TON\nRequis: {bet} TON",
    spin_spinning: "🎰 *TOURNE...* 🎰\n──────────────\n❓ | ❓ | ❓\n──────────────\n📉 Calcul de votre nouveau solde...\n💰 Voyons votre chance",
    spin_win: "🎉 *VOUS AVEZ GAGNÉ!* 🎉\n──────────────\n{board}\n──────────────\n💸 Récompense: *{reward} TON*\n💰 Nouveau solde: {balance} TON",
    spin_lose: "💀 *VOUS AVEZ PERDU* 💀\n──────────────\n{board}\n──────────────\n📉 Perdu: {bet} TON\n💰 Nouveau solde: {balance} TON",
    
    payment_processing: "Traitement du paiement...",
    payment_error: "Erreur lors de la création de la facture. Réessayez.",
    payment_success: "✅ *Paiement réussi!*\n\nVous avez reçu *{credits} crédits*\n💰 Nouveau solde: {balance} TON\n\nBonne chance! 🎰",
    
    button_spin_10: "🔄 10",
    button_spin_50: "🔄 50",
    button_spin_100: "🔄 100",
  },
  
  ru: {
    start_welcome: "🎰 Добро пожаловать в игровой автомат TON!\nВаш баланс: {balance} TON\n\n*Выберите ставку:*",
    help_title: "📜 *Список Команд* 📜\n\n",
    help_start: "/start - Запустить бота и посмотреть баланс\n",
    help_balance: "/balance - Посмотреть текущий баланс\n",
    help_buy: "/buy - Купить кредиты за Telegram Stars\n",
    help_info: "/info - Посмотреть шансы и призы\n",
    help_language: "/language - Изменить язык\n",
    help_spin: "/spin <сумма> - Крутить автомат (напр: /spin 10)\n",
    help_help: "/help - Посмотреть это сообщение",
    
    balance_current: "💰 Ваш текущий баланс: {balance} TON",
    
    buy_title: "💰 *Купить Кредиты* 💰\n\n",
    buy_packages: "Выберите пакет кредитов:\n\n🌟 10 кредитов = 1 Star\n⭐ 100 кредитов = 10 Stars\n✨ 500 кредитов = 45 Stars (10% бонус!)\n💫 1.000 кредитов = 85 Stars (15% бонус!)",
    buy_button_10: "🌟 10 кредитов (1 Star)",
    buy_button_100: "⭐ 100 кредитов (10 Stars)",
    buy_button_500: "✨ 500 кредитов (45 Stars)",
    buy_button_1000: "💫 1.000 кредитов (85 Stars)",
    
    info_title: "📊 *Шансы в Игре* 📊\n\n",
    info_combinations: "*Выигрышные Комбинации:*\n\n",
    info_cherry: "🍒🍒🍒 - 4x вашей ставки\n├ Вероятность: 12,5% (1 из 8)\n└ Пример: Ставка 10 → Выигрыш 40\n\n",
    info_lemon: "🍋🍋🍋 - 20x вашей ставки\n├ Вероятность: 0,8% (1 из 125)\n└ Пример: Ставка 10 → Выигрыш 200\n\n",
    info_star: "⭐⭐⭐ - 40x вашей ставки\n├ Вероятность: 0,34% (1 из 296)\n└ Пример: Ставка 10 → Выигрыш 400\n\n",
    info_seven: "7️⃣7️⃣7️⃣ - 150x вашей ставки\n├ Вероятность: 0,0125% (1 из 8.000)\n└ Пример: Ставка 10 → Выигрыш 1.500\n\n",
    info_jackpot: "🇧🇦🇷 ДЖЕКПОТ - 100x вашей ставки\n├ Вероятность: 0,1% (1 из 1.000)\n└ Пример: Ставка 10 → Выигрыш 1.000\n\n",
    info_stats: "*Статистика:*\n• Процент побед: ~13,7%\n• RTP (Возврат игроку): ~91,5%\n• Преимущество казино: ~8,5%\n\n",
    info_disclaimer: "⚠️ *Примечание:* Кредиты не имеют денежной ценности.\nЭто развлекательная игра.",
    
    language_select: "🌍 *Выбрать Язык* 🌍\n\nВыберите предпочитаемый язык:",
    language_changed: "✅ Язык изменен на Русский!",
    
    spin_insufficient: "❌ Недостаточно средств!\n\nВаш баланс: {balance} TON\nТребуется: {bet} TON",
    spin_spinning: "🎰 *КРУТИМ...* 🎰\n──────────────\n❓ | ❓ | ❓\n──────────────\n📉 Рассчитываем ваш новый баланс...\n💰 Посмотрим на вашу удачу",
    spin_win: "🎉 *ВЫ ВЫИГРАЛИ!* 🎉\n──────────────\n{board}\n──────────────\n💸 Награда: *{reward} TON*\n💰 Новый баланс: {balance} TON",
    spin_lose: "💀 *ВЫ ПРОИГРАЛИ* 💀\n──────────────\n{board}\n──────────────\n📉 Потеряно: {bet} TON\n💰 Новый баланс: {balance} TON",
    
    payment_processing: "Обработка платежа...",
    payment_error: "Ошибка создания счета. Попробуйте снова.",
    payment_success: "✅ *Платеж успешен!*\n\nВы получили *{credits} кредитов*\n💰 Новый баланс: {balance} TON\n\nУдачи! 🎰",
    
    button_spin_10: "🔄 10",
    button_spin_50: "🔄 50",
    button_spin_100: "🔄 100",
  },
};

// Helper function to get translation with placeholder replacement
export function t(lang: Language, key: string, params?: Record<string, any>): string {
  let text = translations[lang]?.[key] || translations['en'][key] || key;
  
  if (params) {
    Object.keys(params).forEach(param => {
      text = text.replace(new RegExp(`{${param}}`, 'g'), String(params[param]));
    });
  }
  
  return text;
}
