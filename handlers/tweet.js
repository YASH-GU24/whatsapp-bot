const { generate_tweet } = require('./meme');
const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');

const tweetHandler = async (msg, client) => {
    if (msg.body.startsWith('!tweet ')) {
        const tweetString = msg.body.slice(7).trim();
        const tweetRegex = /^(\w+) (.+)$/;
        const match = tweetRegex.exec(tweetString);

        if (match) {
            const userName = match[1];
            const body = match[2];
            response = generate_tweet(userName, body)
            response.then(() => {
                const mediaData = fs.readFileSync('memes/tweet/tweet.png');
                const media = new MessageMedia(
                    'image/png',
                    mediaData.toString("base64")
                );
                msg.reply(media)
            })
        } else {
            await msg.reply("Please use the correct format: !tweet [username] [message]");
        }
    }
};

module.exports = tweetHandler;
