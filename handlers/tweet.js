const { generate_tweet } = require('../meme');

const tweetHandler = async (msg, client) => {
    if (msg.body.startsWith('!tweet ')) {
        const tweetString = msg.body.slice(7).trim();
        const tweetRegex = /^(\w+) (.+)$/;
        const match = tweetRegex.exec(tweetString);

        if (match) {
            const username = match[1];
            const tweetContent = match[2];
            const tweetImage = await generate_tweet(username, tweetContent);
            await client.sendMessage(msg.from, tweetImage, { sendMediaAsSticker: false });
        } else {
            await msg.reply("Please use the correct format: !tweet [username] [message]");
        }
    }
};

module.exports = tweetHandler;
