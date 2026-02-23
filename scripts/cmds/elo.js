const fs = require("fs");
const path = "users.json";

module.exports.config = {
    name: "elo",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "Kazuki",
    description: "Show competitive ELO profile"
};

module.exports.onStart = async function({ api, event }) {

    let users = JSON.parse(fs.readFileSync(path));
    let uid = event.senderID;

    if (!users[uid]) users[uid] = {
        elo: 1000,
        wins: 0,
        losses: 0,
        stars: 0,
        division: "Warrior III",
        protection: 0
    };

    let data = users[uid];

    let winrate = data.wins + data.losses > 0
        ? Math.floor((data.wins / (data.wins + data.losses)) * 100)
        : 0;

    api.sendMessage(
`⚔ COMPETITIVE PROFILE

⭐ Division: ${data.division}
📊 ELO Rating: ${data.elo}

🏆 Wins: ${data.wins}
❌ Losses: ${data.losses}
📈 Winrate: ${winrate}%`,
        event.threadID,
        event.messageID
    );
};
