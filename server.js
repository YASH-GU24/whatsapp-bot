const qrcode = require('qrcode-terminal');
const axios = require('axios');
const fs = require('fs');
const { Client, LocalAuth, Poll } = require('whatsapp-web.js');
const { get_reply, get_answer,get_mcqs } = require('./gpt_interaction.js');
const { MessageMedia } = require('whatsapp-web.js');
const { get_aukaat_meme, generate_tweet } = require('./meme.js')
const { download_from_query } = require('./yt_download.js')
const pingHandler = require('./handlers/ping');
const gptHandler = require('./handlers/gpt');
const stickerHandler = require('./handlers/sticker');
const tweetHandler = require('./handlers/tweet');
const answerHandler = require('./handlers/answer');
const getQuestionsHandler = require('./handlers/getQuestions');
const client = new Client({
    authStrategy: new LocalAuth(),
    // proxyAuthentication: { username: 'username', password: 'password' },
    puppeteer: {
        // args: ['--proxy-server=proxy-server-that-requires-authentication.example.com'],
        headless: false
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
    const qm = await msg.getQuotedMessage()
    pingHandler(msg, client);

    // ... rest of the message handling code ...

    if (msg.body.startsWith('!gpt ')) {
        gptHandler(msg, client);
    }
    else if (msg.body=='!sticker') {
        stickerHandler(msg);
    }
    else if (msg.body.startsWith('!tweet ')) {
        tweetHandler(msg, client);
    }
    else if (msg.body == '!answer') {
        answerHandler(msg, client);
    }
    else if (msg.body.startsWith('!get_questions ')) {
        getQuestionsHandler(msg, client);
    }
    else if (msg.body.startsWith('!aukaat ')) {
        // Direct send a new message to specific id
        let message = msg.body.slice(7);

        let response = get_aukaat_meme(message)
        response.then(() => {
            function check() {
                setTimeout(() => {
                    fs.readFile('memes/aukaat_dikha_di/aukaat_meme.gif', 'utf8', function (err, data) {
                        if (err) {
                            // got error reading the file, call check() again
                            check();
                        } else {
                            const mediaData = fs.readFileSync('memes/aukaat_dikha_di/aukaat_meme.gif');
                            const media = new MessageMedia(
                                'image/gif',
                                mediaData.toString("base64")
                            );

                            msg.reply(media)
                        }
                    });
                }, 1000)
            }
            check()
        })
    }
    else if (msg.body.startsWith('!song ')) {
        let query = msg.body.slice(6);
        download_from_query(query, 'audio').then((data) => {
            console.log('data', data);
            if (data) {
                try {
                    const media = MessageMedia.fromFilePath(data + '.mp3')
                    client.sendMessage(msg.from, media, { sendMediaAsDocument: true })
                    fs.unlink(data + '.mp3', (err) => {
                        if (err) {
                            console.error(`Error deleting file: ${data}`);
                        } else {
                            console.log(`File ${data} deleted successfully`);
                        }
                    });
                }
                catch (err) {
                    msg.reply('Error downloading given song');
                }
            } else {
                msg.reply('Cannot find song for the given name');
            }
        }).catch((error) => {
            console.error(error);
        });

    } else if (msg.body.startsWith('!subject ')) {
        // Change the group subject
        let chat = await msg.getChat();
        if (chat.isGroup) {
            let newSubject = msg.body.slice(9);
            chat.setSubject(newSubject);
        } else {
            msg.reply('This command can only be used in a group!');
        }
    } else if (msg.body.startsWith('!echo ')) {
        // Replies with the same message
        msg.reply(msg.body.slice(6));
    } else if (msg.body.startsWith('!desc ')) {
        // Change the group description
        let chat = await msg.getChat();
        if (chat.isGroup) {
            let newDescription = msg.body.slice(6);
            chat.setDescription(newDescription);
        } else {
            msg.reply('This command can only be used in a group!');
        }
    } else if (msg.body === '!leave') {
        // Leave the group
        let chat = await msg.getChat();
        if (chat.isGroup) {
            chat.leave();
        } else {
            msg.reply('This command can only be used in a group!');
        }
    } else if (msg.body.startsWith('!join ')) {
        const inviteCode = msg.body.split(' ')[1];
        try {
            await client.acceptInvite(inviteCode);
            msg.reply('Joined the group!');
        } catch (e) {
            msg.reply('That invite code seems to be invalid.');
        }
    } else if (msg.body.startsWith('!addmembers')) {
        const group = await msg.getChat();
        const result = await group.addParticipants(['number1@c.us', 'number2@c.us', 'number3@c.us']);
        /**
         * The example of the {@link result} output:
         *
         * {
         *   'number1@c.us': {
         *     code: 200,
         *     message: 'The participant was added successfully',
         *     isInviteV4Sent: false
         *   },
         *   'number2@c.us': {
         *     code: 403,
         *     message: 'The participant can be added by sending private invitation only',
         *     isInviteV4Sent: true
         *   },
         *   'number3@c.us': {
         *     code: 404,
         *     message: 'The phone number is not registered on WhatsApp',
         *     isInviteV4Sent: false
         *   }
         * }
         *
         * For more usage examples:
         * @see https://github.com/pedroslopez/whatsapp-web.js/pull/2344#usage-example1
         */
        console.log(result);
    } else if (msg.body === '!creategroup') {
        const partitipantsToAdd = ['number1@c.us', 'number2@c.us', 'number3@c.us'];
        const result = await client.createGroup('Group Title', partitipantsToAdd);
        /**
         * The example of the {@link result} output:
         * {
         *   title: 'Group Title',
         *   gid: {
         *     server: 'g.us',
         *     user: '1111111111',
         *     _serialized: '1111111111@g.us'
         *   },
         *   participants: {
         *     'botNumber@c.us': {
         *       statusCode: 200,
         *       message: 'The participant was added successfully',
         *       isGroupCreator: true,
         *       isInviteV4Sent: false
         *     },
         *     'number1@c.us': {
         *       statusCode: 200,
         *       message: 'The participant was added successfully',
         *       isGroupCreator: false,
         *       isInviteV4Sent: false
         *     },
         *     'number2@c.us': {
         *       statusCode: 403,
         *       message: 'The participant can be added by sending private invitation only',
         *       isGroupCreator: false,
         *       isInviteV4Sent: true
         *     },
         *     'number3@c.us': {
         *       statusCode: 404,
         *       message: 'The phone number is not registered on WhatsApp',
         *       isGroupCreator: false,
         *       isInviteV4Sent: false
         *     }
         *   }
         * }
         *
         * For more usage examples:
         * @see https://github.com/pedroslopez/whatsapp-web.js/pull/2344#usage-example2
         */
        console.log(result);
    } else if (msg.body === '!groupinfo') {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            msg.reply(`
                *Group Details*
                Name: ${chat.name}
                Description: ${chat.description}
                Created At: ${chat.createdAt.toString()}
                Created By: ${chat.owner.user}
                Participant count: ${chat.participants.length}
            `);
        } else {
            msg.reply('This command can only be used in a group!');
        }
    } else if (msg.body === '!chats') {
        const chats = await client.getChats();
        client.sendMessage(msg.from, `The bot has ${chats.length} chats open.`);
    } else if (msg.body === '!info') {
        let info = client.info;
        client.sendMessage(msg.from, `
            *Connection info*
            User name: ${info.pushname}
            My number: ${info.wid.user}
            Platform: ${info.platform}
        `);
    }
});
