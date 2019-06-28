const Command = require('../types/Command');

class Credits extends Command {
  constructor() {
    super();
  }

  run(client, msg) {
    msg.channel.send('© Copyright 2019\n**</>** with :hearts: by DayColor#0001');
  }
}

module.exports = {
  run: Credits,
  conf: {
    aliases: []
  },
  help: {
    name: 'credits',
    description: 'Shows the credits for this bot.',
    usage: 'credits',
    priority: 6
  }
};