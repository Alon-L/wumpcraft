const fs = require('fs');
const path = require('path');

class EventsHandler {
  constructor(client) {
    this.client = client;
  }

  load() {
    const { client } = this;
    const events = fs.readdirSync(path.join(__dirname + '../../events'));
    console.log(`Loading a total of ${events.length} events.`);
    for (const file of events) {
      const eventName = file.split('.')[0].toLowerCase();
      console.log(`Loading Event: ${eventName}.`);
      const event = require(`../events/${file}`);
      client.on(eventName, function() {
        new event().init(client, ...arguments);
      });
      delete require.cache[require.resolve(`../events/${file}`)];
    }
  }
}

module.exports = EventsHandler;