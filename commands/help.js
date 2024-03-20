const { SlashCommandBuilder } = require('discord.js');
const { botInfo } = require('../src/info');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('查看使用方法'),
    async execute(interaction) {
        const helpInfo = await botInfo();
        await interaction.reply({ embeds: [helpInfo] });
    },
};
