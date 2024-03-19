const { Client, GatewayIntentBits, Collection, Events } = require("discord.js");
require("dotenv/config");
const fs = require("node:fs");
const path = require("node:path");
const { getEmbedFromExchange } = require("./src/embed");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

//add slash commands
client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on("ready", async () => {
  console.log("Ready to start");

  //定時送出訊息的頻道ID，可多個
  const channel = client.channels.cache.find(
    (channel) => channel.id === process.env.CHANNEL_ID
  );
  const testC = client.channels.cache.find(
    (channel) => channel.id === process.env.CHANNEL2_ID
  );
  const channel3 = client.channels.cache.find(
    (channel) => channel.id === process.env.CHANNEL3_ID
  );

  // 原作者使用，目前無使用
  // const channel2 = client.channels.cache.find(channel2 => channel2.id === process.env.PAYED_CHANNEL_ID)

  // send msg every x milliseconds
  // 可以任意增減
  // 目前設定 : 4分鐘定時抓取資料
  try {
    setInterval(async () => {
      const finalEmbed = await getEmbedFromExchange();

      console.log(
        "🚀 ------------------------------------------------------------------🚀"
      );
      console.log("🚀 ~ file: bot.js ~ for vps log", "bot is fine now");
      console.log(
        "🚀 ------------------------------------------------------------------🚀"
      );

      //送出的頻道
      // channel.send({ embeds: [finalEmbed] });
      // testC.send({embeds:[finalEmbed]})
      // channel3.send({ embeds: [finalEmbed] });
    }, 240000);
  } catch (e) {
    console.log(e);
  }

  // 底下需要刪除，否則沒有加入PAYED_CHANNEL_ID會報錯
  // setInterval( async() => {
  //     const finalEmbed = await getEmbedFromExchange();

  //     console.log('🚀 ------------------------------------------------------------------🚀');
  //     console.log('🚀 ~ file: bot.js ~ for vps log', 'channel2 is fine now');
  //     console.log('🚀 ------------------------------------------------------------------🚀');

  //     channel2.send({ embeds: [finalEmbed] });
  // }, 600000);
  // 刪到這裡
});

//使用 !+文字實現指令 (Ex : !d)
client.on("messageCreate", async (msg) => {
  //字串分析
  try {
    const prefix = "!"; //前綴符號定義
    if (msg.content.substring(0, prefix.length) === prefix) {
      //如果訊息的開頭~前綴字長度的訊息 = 前綴字
      const cmd = msg.content.substring(prefix.length).split(" "); //以空白分割前綴以後的字串

      //功能實作
      switch (cmd[0]) {
        case "d":
          const finalEmbed = await getEmbedFromExchange();
          msg.channel.send({ embeds: [finalEmbed] });
          break;
        case "b":
          msg.channel.send("test msg");
          break;
      }
    }
  } catch (err) {
    console.log("OnMessageError", err);
  }
});

// slash commands reply
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.TOKEN);
