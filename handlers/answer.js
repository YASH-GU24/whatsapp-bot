const { gpt3Interaction } = require('../gpt_interaction');

const answerHandler = async (msg, client) => {
    if (msg.body === '!answer') {
        try {
            const media = await msg.downloadMedia();
            const response = await gpt3Interaction(media.data);
            client.sendMessage(msg.from, response);
        } catch (e) {
            console.log(e);
            client.sendMessage(msg.from, "Failed to process the media. Please try again.");
        }
    }
};

module.exports = answerHandler;
