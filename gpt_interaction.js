
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
async function get_answer(filename) {

  return Tesseract.recognize(
    filename,
    'eng',
  ).then(async ({ data: { text } }) => {
    console.log(text)
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: 'You are given a question, Tell the answer in short' +text }],
      model: 'gpt-3.5-turbo',
    });
    return chatCompletion
  })


}
//Exporting these function as they need to be used in index.js
module.exports = {get_reply,get_answer}