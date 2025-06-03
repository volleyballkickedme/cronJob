import TelegramBot from 'node-telegram-bot-api';

export default async function handler(req, res) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const bot = new TelegramBot(token, { polling: false });

    const question = "No meals for me on";
    const weekdays = [
        "Monday Lunch", "Monday Dinner",
        "Tuesday Lunch", "Tuesday Dinner",
        "Wednesday Lunch", "Wednesday Dinner",
        "Thursday Lunch", "Thursday Dinner",
        "Friday Lunch", "Friday Dinner",
    ];
    const weekends = [
        "Saturday Lunch", "Saturday Dinner",
        "Sunday Lunch", "Sunday Dinner"
    ];

    // Send poll for weekday options
    try {
        await Promise.all([
            bot.sendPoll(chatId, question, weekdays, {
                is_anonymous: false,
                allows_multiple_answers: true
            }),
            bot.sendPoll(chatId, question, weekends, {
                is_anonymous: false,
                allows_multiple_answers: true
            })
        ]);

        res.status(200).send("Poll sent!");

    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to send poll.");
    }   
}

// Command to manually trigger poll
bot.onText(/\/poll/, async () => {
    const question = "No meals for me on";
    const weekdays = [
    "Monday Lunch", "Monday Dinner",
    "Tuesday Lunch", "Tuesday Dinner",
    "Wednesday Lunch", "Wednesday Dinner",
    "Thursday Lunch", "Thursday Dinner",
    "Friday Lunch", "Friday Dinner",
    ];
    const weekends = [
    "Saturday Lunch", "Saturday Dinner",
    "Sunday Lunch", "Sunday Dinner"
    ];

    try {
        await Promise.all([
            bot.sendPoll(chatId, question, weekdays, {
                is_anonymous: false,
                allows_multiple_answers: true
            }),
            bot.sendPoll(chatId, question, weekends, {
                is_anonymous: false,
                allows_multiple_answers: true
            })
        ]);
        console.log("Manual poll triggered successfully.");
    } catch (error) {
        console.error("Error sending manual poll:", error);
    }
});
