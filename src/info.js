const { EmbedBuilder } = require('discord.js');

module.exports.botInfo = async function botInfo() {

    return new EmbedBuilder()
        .setAuthor({
            name: "POE台服自動報價 機器人 使用須知",
        })
        .setTitle("詳細版本")
        .setURL("https://github.com/NTX8205/poe-discord-bot#readme")
        .setDescription("使用方法\n\n1.  輸入 </help:1112299719394340897> 即可開啟使用說明\n\n2. 輸入 </price:1112209071601365124> 或 `!d` 可查看目前價格\n\n註 : 本人非作者，只修改了一部分\n\n來源及作者 : [【其他】台服自動報價機器人](https://forum.gamer.com.tw/C.php?bsn=18966&snA=131543)\n原始碼 : https://github.com/diehard5566/poe-discord-bot\n修改後的版本 : https://github.com/NTX8205/poe-discord-bot")
        .setColor("#00b0f4")
        .setFooter({
            text: "使用說明",
        })
        .setTimestamp();
}