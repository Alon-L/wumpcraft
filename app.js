const Discord = require('discord.js');
const { token } = require('./src/configs/token.json');
const CommandsHandler = require('./src/handlers/CommandsHandler.js');
const EventsHandler = require('./src/handlers/EventsHandler.js');

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.permLevel = require('./src/utils/permLevel');

function login() {
  client.login(token);
}

login();
new CommandsHandler(client).load();
new EventsHandler(client).load();