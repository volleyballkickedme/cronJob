import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const bot = new TelegramBot(token, { polling: true });

function getThisWeekDates() {
    const result = [];
    const curr = new Date();

    // Find this week's Monday
    const day = curr.getDay();
    const diffToMonday = (day === 0 ? -6 : 1 - day); // Sunday (0) -> last Monday
    
    let thisMonday = new Date(curr);
    thisMonday.setDate(curr.getDate() + diffToMonday);

    // Collect dates for this week (Monday to Sunday)
    for (let i = 0; i < 7; i++) {
        const d = new Date(thisMonday);
        d.setDate(thisMonday.getDate() + i);
        result.push(d);
    }
    return result;
}

export default async function handler(req, res) {
    const question = "No meals for me on";
    const meals = ["Lunch", "Dinner"]
    const nextWeekDates = getThisWeekDates();
    const weekDays = nextWeekDates.slice(0, 5);
    const weekEnds = nextWeekDates.slice(5, 7);

    const displayWeekDays = weekDays.flatMap((date) => ([
        `${date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} ${meals[0]}`,
        `${date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} ${meals[1]}`
    ]));

    const displayWeekEnds = weekEnds.flatMap((date) => ([
        `${date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} ${meals[0]}`,
        `${date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} ${meals[1]}`
    ]));

    // Send poll for weekday options
    try {
        await Promise.all([
            bot.sendPoll(chatId, question, displayWeekDays, {
                is_anonymous: false,
                allows_multiple_answers: true
            }),
            bot.sendPoll(chatId, question, displayWeekEnds, {
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