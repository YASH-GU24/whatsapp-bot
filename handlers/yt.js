const ytdl = require('ytdl-core');
const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');

const ytHandler = async (msg, client) => {
    let url = msg.body.slice(4);
    link = url;
    name = 'yt'
    try {
        const info = await ytdl.getInfo(link);
        const formats = info.formats;

        // Find the format you prefer
        let preferredFormat;
        for (const format of formats) {
            if (format.container === 'mp4' && format.hasAudio == true && format.hasVideo == true) {
                preferredFormat = format;
                break;
            }
        }

        if (!preferredFormat) {
            console.log('No suitable audio format found.');
            return;
        }

        const contentLength = preferredFormat.contentLength;
        if (!contentLength || contentLength > 100 * 1024 * 1024) {
            console.log('Video size is more than 100MB. Skipping download.');
            return;
        }

        const video = ytdl(link, { format: preferredFormat });
        video.pipe(fs.createWriteStream(name + '.mp4'));

        return new Promise((resolve, reject) => {
            video.on('end', () => {
                console.log('Download completed');
                const media = MessageMedia.fromFilePath('yt.mp4')
                client.sendMessage(msg.from, media, { sendMediaAsDocument: true })
                fs.unlink('yt.mp4', (err) => {
                    if (err) {
                        console.error(`Error deleting file`);
                    } else {
                        console.log(`File deleted successfully`);
                    }
                });
                resolve(name);
            });

            video.on('error', (err) => {
                console.error('Error:', err);
                reject(err);
            });
        });
    }
    catch (err) {
        console.log("Cannot download audio", err);
    }
};

module.exports = ytHandler;


