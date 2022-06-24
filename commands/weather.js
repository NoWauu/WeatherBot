const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
// const { Compass } = require('compass.js');

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

        const location = data["location"];
        const current = data["current"];

        let country = location.country;
        let region = location.region;
        let city = location.name;
        let weatherIcon = `https:${current["condition"].icon}`;
        let weatherText = current["condition"].text;
        let humid = current.humidity;
        let tempC = current.temp_c;
        let tempF = current.temp_f;
        const date = new Date();

        responseEmbed.setTitle(`Weather of ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`)
          .setDescription(`${city}, in ${country}`)
          .setThumbnail(weatherIcon)


          .addField("Status", `${weatherText}`,true)
          .addField("Temperature", `${tempC}°C/${tempF}°F`, true)
          .addField("Humidity", `${humid}%`, true)

          .setFooter({text: "Made by NoWay_y#4921", iconURL: "https://i.imgur.com/a3R7UJw.png"})
      });

    interaction.reply({ embeds: [responseEmbed] });

  }
}

// TODO: MessageEmbed with -> map, wind rose + wind speed, humidity + precipitation rate, temperature, weather icon,
//  date, location (country, region, city)
