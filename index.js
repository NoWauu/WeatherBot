const { Client, Intents, Collection } = require('discord.js');
const { token } = require("./config.json");

const fs = require("node:fs");
const path = require("node:path");

const client  = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'server') {
    await interaction.reply(`Server : ${interaction.guild.name}, ID : ${interaction.guild.id}`);
  } else if (commandName === 'user') {
    await interaction.reply(`User : ${interaction.user.tag}, ID : ${interaction.user.id}`);
  } else if (!interaction.replied) {
    await interaction.reply('Unknown command.');
  }
});

client.login(token);