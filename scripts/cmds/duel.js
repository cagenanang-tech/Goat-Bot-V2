const fs = require("fs");
const path = "users.json";

module.exports.config = { name: "duel", cooldowns: 5 };

module.exports.onStart = async function({ api, event, args }) {

    let users = JSON.parse(fs.readFileSync(path));

    let mention = Object.keys(event.mentions)[0];
    if (!mention)
        return api.sendMessage("⚔ Mention someone!", event.threadID);

    let challenger = event.senderID;
    let opponent = mention;

    if (!users[challenger]) users[challenger] = { money:1000, wins:0, losses:0, stars:0 };
    if (!users[opponent]) users[opponent] = { money:1000, wins:0, losses:0, stars:0 };

    let bet = parseInt(args[1]) || 0;

    let winner = Math.random() > 0.5 ? challenger : opponent;
    let loser = winner === challenger ? opponent : challenger;

    users[winner].money += bet;
    users[loser].money -= bet;

    users[winner].wins++;
    users[loser].losses++;

    users[winner].stars++;
    if (users[loser].protection > 0) users[loser].protection--;
    else users[loser].stars = Math.max(0, (users[loser].stars||0)-1);

    fs.writeFileSync(path, JSON.stringify(users,null,2));

    api.sendMessage(
`⚔ DUEL RESULT

🏆 Winner: ${winner}
💰 Bet: ${bet}$`,
        event.threadID
    );
};
