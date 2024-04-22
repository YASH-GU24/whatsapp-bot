var ytdl = require('ytdl-core');
const fs = require('fs');
const yts = require('yt-search');

async function download_audio(link, name) {
    try {
        const video = ytdl(link, { filter: 'audioonly' });
        video.pipe(fs.createWriteStream(name + '.mp3'))

        return new Promise((resolve, reject) => {
            video.on('end', () => {
                console.log('Download completed');
                resolve(name);
            });

            video.on('error', (err) => {
                console.error('Error:', err);
                reject(err);
            });
        });
    }
    catch (err) {
        console.log("Cannot download audio", err)
    }
}

async function get_top_result(query) {
    try {
        const result = await yts(query);
        const topVideo = result.videos[0];

        if (topVideo) {
            vid_name = topVideo.title;
            vid_url = topVideo.url;
            return { 'name': vid_name, 'url': vid_url }
        } else {
            console.log('No videos found for the given query.');
            return null
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function download_from_query(query, type) {
    if (type == 'audio') {
        try {
            const result = await get_top_result(query);
            if (result) {
                console.log('result', result);
                const downloadedFileName = await download_audio(result.url, result.name);
                return downloadedFileName;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }
}
module.exports = { download_from_query };
