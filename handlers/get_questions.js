const { get_mcqs } = require('./gpt_interaction');
const { Poll } = require('whatsapp-web.js');
const getQuestionsHandler = async (msg, client) => {
    if (msg.body.startsWith('!get_questions ')) {
        const inputString = msg.body.slice(15).trim();
        const regexPattern = /^(\d+) (.+)$/;
        const match = regexPattern.exec(inputString);

        if (match) {
            const numQuestions = parseInt(match[1], 10);
            const query = match[2];
            const questions = await get_mcqs(query, numQuestions);
            questions_list = JSON.parse(questions.choices[0].message.content)
            for (let i = 0; i < questions_list.length; i++) {
                try
                {
                    
                    await msg.reply(new Poll(questions_list[i]['question'], questions_list[i]['options']));
                }
                catch(err)
                {
                    console.log(err)
                    continue;
                }
              }
              for (let i = 0; i < questions_list.length; i++) {
                try
                {
                    
                    await msg.reply(`Answer ${i+1} ` + questions_list[i]["answer"]);
                }
                catch(err)
                {
                    console.log(err)
                    continue;
                }
              }
        } else {
            client.sendMessage(msg.from, "Please use the format: !get_questions [number] [search term]");
        }
    }
};

module.exports = getQuestionsHandler;
