const {download_from_query} = require('./yt_download')
const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');

const songHandler = async (msg, client) => {
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
                console.log("error",err)
                msg.reply('Error downloading given song');
            }
        } else {
            msg.reply('Cannot find song for the given name');
        }
    }).catch((error) => {
        console.error(error);
    });
};

module.exports = songHandler;


