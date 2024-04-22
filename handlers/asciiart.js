const figlet = require("figlet");

const asciiHandler = async (msg) => {
    let message = msg.body.slice(7);
    figlet.text(
        message,
        {
          font: "ANSI Shadow",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 15,
          whitespaceBreak: true,
        },
        function (err, data) {
          if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
          }
          msg.reply(data)
        }
      );
};

module.exports = asciiHandler;