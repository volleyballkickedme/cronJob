import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true }); // Enable polling to receive messages

bot.on('message', (msg) => {
  console.log("Chat ID:", msg.chat.id);
  console.log("Chat Type:", msg.chat.type);
  console.log("Chat Title:", msg.chat.title);
});
