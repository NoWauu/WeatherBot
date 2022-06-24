const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
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
    let responseEmbed = new MessageEmbed()

    await fetch(url, settings)
      .then(res => res.json())
      .then(async data => {
        console.log(data);

        let country = data["location"].country;
        let region = data["location"].region;
        let city = data["location"].name;
        let weatherIcon = `https:${data["current"]["condition"].icon}`;
        let weatherText = data["current"]["condition"].text.toString();
        let humid = data["current"].humidity;
        let tempC = data["current"].temp_c;
        let tempF = data['current'].temp_f;
        const date = new Date();

          responseEmbed.setTitle(`Weather of ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`)
          .setAuthor({ name:"made by NoWay_y", iconURL: "https://i.imgur.com/a3R7UJw.png", url:"https://localhost"})
          .setDescription(`${city}, in ${country}`)
          .setThumbnail(weatherIcon)

          .addField("Status", weatherText.toString(), true)
          .addField("Temperature", `${tempC}°C/${tempF}°F`, true)
          .addField("Humidity", `${humid}%`, true)

      });

    interaction.reply({ embeds: [responseEmbed] });

  }
}

// TODO: MessageEmbed with -> map, wind rose + wind speed, humidity + precipitation rate, temperature, weather icon,
//  date, location (country, region, city)
