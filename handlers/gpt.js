const { gpt3Interaction } = require('../gpt_interaction');

const gptHandler = async (msg, client) => {
    if (msg.body.startsWith('!gpt ')) {
        let message = msg.body.slice(5);
        const qm = await msg.getQuotedMessage();
        if (qm) {
            message = qm.body + " " + message;
        }
        const response = await gpt3Interaction(message);
        client.sendMessage(msg.from, response);
    }
};

module.exports = gptHandler;
