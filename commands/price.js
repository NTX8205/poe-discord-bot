const { SlashCommandBuilder } = require('discord.js');
const { getEmbedFromExchange } = require('../src/embed')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('price')
        .setDescription('查看當前價格'),
    async execute(interaction) {
        const finalEmbed = await getEmbedFromExchange();
        await interaction.reply({ embeds: [finalEmbed] });
    },
};
