const { searchQuestions } = require('../question_search');

const getQuestionsHandler = async (msg, client) => {
    if (msg.body.startsWith('!get_questions ')) {
        const inputString = msg.body.slice(15).trim();
        const regexPattern = /^(\d+) (.+)$/;
        const match = regexPattern.exec(inputString);

        if (match) {
            const numQuestions = parseInt(match[1], 10);
            const query = match[2];
            const questions = await searchQuestions(query, numQuestions);
            let reply = questions.map((q, index) => `${index + 1}: ${q}`).join('\n');
            client.sendMessage(msg.from, reply);
        } else {
            client.sendMessage(msg.from, "Please use the format: !get_questions [number] [search term]");
        }
    }
};

module.exports = getQuestionsHandler;
