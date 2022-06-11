const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Gives the weather of the specified date if given, else of the current day"),
  async execute(interaction) {
    await interaction.reply("weather");
  }
}