const Discord = require('discord.js');
const { grass } = require('../configs/blocks');
const { embed: { colors: { main }, footer } } = require('../configs/default');
const Command = require('../types/Command');

class Invite extends Command {
  constructor() {
    super();
  }

  run(client, msg) {
    const embedBuild = new Discord.RichEmbed()
      .setTitle('Invite the bot to your server!')
      .setColor(main)
      .setTimestamp()
      .setFooter(footer)
      .setDescription(`${client.emojis.get(grass.id)} Click [here](https://discordapp.com/oauth2/authorize?client_id=592667565898334208&scope=bot&permissions=268774480) to add **WumpCraft** to your server!`)
      .setImage('https://raw.githubusercontent.com/DayColor/wumpcraft/master/assets/header.png?token=AJBO3S5JYVPP4K4E2AW25C25D5ENU');
    msg.channel.send({ embed: embedBuild });
  }
}

module.exports = {
  run: Invite,
  conf: {
    aliases: []
  },
  help: {
    name: 'invite',
    description: 'Sends the invitation link for the bot.',
    usage: 'invite',
    priority: 5
  }
};