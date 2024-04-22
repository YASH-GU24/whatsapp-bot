const { ndown } = require("nayan-media-downloader")
const request = require("request");
const https = require('https');
const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');

const reelHandler = async (msg, client) => {
    let url = msg.body.slice(6);
    const URL = ndown(url);
    URL.then((data) => {
        request({
            url: data.data[0].url,
            method: "HEAD"
        }, function (err, response, body) {
            if (err) {
                console.error('Error:', err);
                return;
            }
            size = response.headers['content-length'];
            if (size < 104857599) {     //check if less than 100mb
                console.log(size)
                const file = fs.createWriteStream("reel.mp4");

                https.get(data.data[0].url, response => {
                    response.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        console.log('Reel downloaded successfully.');
                        const media = MessageMedia.fromFilePath('reel.mp4')
                        client.sendMessage(msg.from, media, { sendMediaAsDocument: true })
                        fs.unlink('reel.mp4', (err) => {
                            if (err) {
                                console.error(`Error deleting file`);
                            } else {
                                console.log(`File deleted successfully`);
                            }
                        });
                    });
                }).on('error', err => {
                    fs.unlink("reel.mp4", () => { }); // Delete the file if an error occurs during download
                    console.error('Error downloading file:', err);
                });
            }
            else {
                return "Reel size greater than 100mb"
            }
        });
    }).catch(error => {
        msg.reply("Error, Invalid link")
        console.error('Error:', error);
    });
};

module.exports = reelHandler;


