// testSendPoll.js
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const bot = new TelegramBot(token, { polling: false });

const question = "No meals for me on";
const options = [
  "Monday Lunch", "Monday Dinner",
  "Tuesday Lunch", "Tuesday Dinner",
  "Wednesday Lunch", "Wednesday Dinner",
  "Thursday Lunch", "Thursday Dinner",
  "Friday Lunch", "Friday Dinner",
];

async function main() {
  try {
    console.log("📤 Sending poll...");
    await Promise.all([
        bot.sendPoll(chatId, question, options, {
            is_anonymous: false,
            allows_multiple_answers: true
        }),

        bot.sendPoll(chatId, question, options, {
            is_anonymous: false,
            allows_multiple_answers: true
        })
    ]);
    
    console.log("✅ Poll sent!");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

main();
