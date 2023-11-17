const TextOnGif = require('text-on-gif');

async function get_aukaat_meme(msg){

    //create a TextOnGif object
    var gif = new TextOnGif({
      file_path: "aukaat-aukaat-dikha-di.gif",
      alignment_y:"top",
      font_color:"orange",
      font_size:"25px"
      //path to local file, url or Buffer
    });

    //write as file
    return gif.textOnGif({
        text: msg,
        get_as_buffer: false, //set to false to save time
        write_path: "aukaat_meme.gif"
    });
    
}

module.exports = {get_aukaat_meme}