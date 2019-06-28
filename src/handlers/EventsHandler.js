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
      const { run, name } = require(`../events/${file}`);
      console.log(`Loading Event: ${name}.`);
      client.on(name, function() {
        new run().init(client, ...arguments);
      });
      delete require.cache[require.resolve(`../events/${file}`)];
    }
  }
}

module.exports = EventsHandler;