const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription("Replies with the server's name and ID"),
  async execute(interaction) {
    await interaction.reply(`Server : ${interaction.guild.name}, ID : ${interaction.guild.id}`);
  }
}