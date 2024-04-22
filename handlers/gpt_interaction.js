
const OpenAI = require('openai');
var Tesseract = require('tesseract.js');

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

async function get_mcqs(question, n) {
  prompt = `For the given question/concept generate ${Math.min(n, 10)} questions with 4 options in the format [{"question":str,"options":["option1","option2","option3","option4"],"answer":str},{"question":str,"options":["option1","option2","option3","option4"],"answer":str}...]
  question: ${question}, 
  Reply only with JSON in above mentioned format`
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
  });
  return chatCompletion
}
//Exporting these function as they need to be used in index.js
module.exports = { get_reply, get_mcqs }