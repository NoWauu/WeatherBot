const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user's tag and ID"),
  async execute(interaction) {
    await interaction.reply(`User : ${interaction.user.tag}, ID : ${interaction.user.id}`);
  }
}