const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');

const stickerHandler = async (msg) => {
    const qm = await msg.getQuotedMessage()
    if (msg.body === '!sticker' && msg.hasMedia) {
        const media = await msg.downloadMedia();
        const folder = process.cwd() + '/img/';
        const filename = folder + 'temp.png';
        fs.mkdirSync(folder, { recursive: true });
        fs.writeFileSync(filename, Buffer.from(media.data, 'base64').toString('binary'), 'binary');
        const mediaData = fs.readFileSync(filename);
        const sticker = new MessageMedia(
            'image/png',
            mediaData.toString("base64")
        );
        return sticker;
    }
    else if (qm && qm.hasMedia) {
        msg = qm;
        const media = await msg.downloadMedia();
        const folder = process.cwd() + '/img/';
        const filename = folder + 'temp.png';
        fs.mkdirSync(folder, { recursive: true });
        fs.writeFileSync(filename, Buffer.from(media.data, 'base64').toString('binary'), 'binary');
        const mediaData = fs.readFileSync(filename);
        const sticker = new MessageMedia(
            'image/png',
            mediaData.toString("base64")
        );
        return sticker;
    }
};

module.exports = stickerHandler;
