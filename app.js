const Discord = require('discord.js');
const { createData } = require('./src/data');
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
createData();
new CommandsHandler(client).load();
new EventsHandler(client).load();

process.on('exit', close);

process.on('SIGINT', close);

process.on('SIGUSR1', close);
process.on('SIGUSR2', close);

process.on('uncaughtException', close);

function close() {
  // TODO: Save data from ./src/data.js into the files
  console.log('Close');
}