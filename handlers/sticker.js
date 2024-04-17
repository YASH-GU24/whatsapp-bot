const { MessageMedia } = require('whatsapp-web.js');

const stickerHandler = async (msg) => {
    if (msg.body === '!sticker' && msg.hasMedia) {
        const media = await msg.downloadMedia();
        // Convert the media to 'image/png' format for sticker conversion
        const imageAsSticker = new MessageMedia(
            'image/png',
            media.data,
            media.filename
        );
        await msg.reply(imageAsSticker, { sendMediaAsSticker: true });
    }
};

module.exports = stickerHandler;
