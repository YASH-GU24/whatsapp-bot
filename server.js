const qrcode = require('qrcode-terminal');
const axios = require('axios');
const fs = require('fs');
const { Client, LocalAuth } = require('whatsapp-web.js');
const songHandler  = require('./handlers/songs')
const pingHandler = require('./handlers/ping');
const gptHandler = require('./handlers/gpt');
const stickerHandler = require('./handlers/sticker');
const tweetHandler = require('./handlers/tweet');
const asciiHandler = require('./handlers/asciiart.js')
const getQuestionsHandler = require('./handlers/get_questions');
const reelHandler  = require('./handlers/reel')
const ytHandler  = require('./handlers/yt')

const client = new Client({
    authStrategy: new LocalAuth(),
    // proxyAuthentication: { username: 'username', password: 'password' },
    puppeteer: {
        // args: ['--proxy-server=proxy-server-that-requires-authentication.example.com'],
        headless: true
    },
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    }
});

// const client = new Client();
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
});

client.on('message', async msg => {
    pingHandler(msg, client);
    if (msg.body.startsWith('!llm ')) {
        response = await gptHandler(msg, client);
        client.sendMessage(msg.from, response.choices[0].message.content);
    }
    else if (msg.body == '!sticker') {
        sticker = await stickerHandler(msg);
        client.sendMessage(msg.from, sticker, { sendMediaAsSticker: true })
    }
    else if (msg.body.startsWith('!tweet ')) {
        tweetHandler(msg, client);
    }
    else if (msg.body.startsWith('!ascii ')) {
        asciiHandler(msg);
    }
    else if (msg.body.startsWith('!get_questions ')) {
        getQuestionsHandler(msg, client);
    }
    else if (msg.body.startsWith('!song ')) {
        songHandler(msg,client)
    }
    else if (msg.body.startsWith('!reel ')) {
        reelHandler(msg,client);
    }
    else if (msg.body.startsWith('!yt ')) {
        ytHandler(msg,client);
    }
    else if (msg.body=="!help") {
        msg.reply(
        `You can use following commands:-
    !llm <prompt> :- Get gpt response for the prompt
    !sticker :- Convert quoted image to sticker
    !song <name> :- Download any song with its name
    !reel <link> :- Download any reel through its link
    !yt <link> :- Download any youtube video through its link 
    !tweet <username> <content> :- Generate a fake tweet
    !ascii <text> :- Generate ascii art for text
    !get_question <number_of_questions> <topic> :- get few questions on some topic through polls`)
    }
});
