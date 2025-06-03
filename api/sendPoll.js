import bot from "./bot";

export default async function handler(req, res) {
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

bot.onText(/\/sendpoll/, async (msg) => {
    const chatId = msg.chat.id;
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
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, "Failed to send poll.");
    }
});