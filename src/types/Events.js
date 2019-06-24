const Discord = require('discord.js');
const { prefix } = require('../configs/default');
const embed = require('../utils/embed');

class Events {
  constructor() {
    this.embed = embed;
    this.prefix = prefix;
  }
}

module.exports = Events;