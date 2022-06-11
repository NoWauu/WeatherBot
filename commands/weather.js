const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

async function getJSONResponse(body) {
  let fullBody = '';

  for await (const data of body) {
    fullBody += data.toString();
  }

  return JSON.parse(fullBody);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Gives the weather of the specified date if given, else of the current day")
    .addStringOption(option =>
      option.setName('location')
        .setDescription("Gives the weather in this location")
        .setRequired(true)),
  async execute(interaction) {

    let searchedLocation = interaction.options.getString('location');

    let url = `https://api.weatherapi.com/v1/current.json?key=afc7001b47b34cba8e2170548221106&q=${searchedLocation}`;
    let settings = { method: "GET"};

    let response = new MessageEmbed();

    await fetch(url, settings)
      .then(res => res.json())
      .then(data => {
        response.setTitle(`Weather of ${Date.now()}`)
          .setAuthor({ name: "NoWay_y", iconURL: ''})
      });

  }
}