const { get_reply } = require('./gpt_interaction');

const gptHandler = async (msg, client) => {
    if (msg.body.startsWith('!llm ')) {
        let message = msg.body.slice(5);
        const qm = await msg.getQuotedMessage();
        if (qm) {
            message = qm.body + " " + message;
        }
        const response = await get_reply(message);
        return response;
    }
};

module.exports = gptHandler;
