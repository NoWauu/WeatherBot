const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

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
      option.setName("location")
        .setDescription("The location of the wanted weather")
        .setRequired(true)),

  async execute(interaction) {


    let searchedLocation = interaction.options.getString('location');
    console.log(searchedLocation);

    let url = `https://api.weatherapi.com/v1/current.json?key=afc7001b47b34cba8e2170548221106&q=${searchedLocation}`;
    let settings = { method: "GET" };

    let response = "";

    await fetch(url, settings)
      .then(res => res.json())
      .then(async data => {
        console.log(data);

        let country = data["location"].country;
        let region = data["location"].region;
        let city = data["location"].name;

        response += `Weather in ${city}, ${region}, ${country} : `
        response += data["current"]["condition"].text;

      });

    interaction.reply(response);

  }
}

// TODO: MessageEmbed with -> map, wind rose + wind speed, humidity + precipitation rate, temperature, weather icon,
//  date, location (country, region, city)
