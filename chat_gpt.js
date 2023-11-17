
const OpenAI = require('openai');
require('dotenv').config()
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

async function get_reply(msg) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: msg }],
    model: 'gpt-3.5-turbo',
  });
  return chatCompletion
}

//Exporting these function as they need to be used in index.js
module.exports = {get_reply}