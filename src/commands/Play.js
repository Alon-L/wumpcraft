const world = require('../configs/world');
const renderHealthbar = require('../player/healthbar');
const { hotbar: renderHotbar } = require('../player/hotbar');
const translateWorld = require('../world/translateWorld');
const generateOres = require('../world/generateOres');
const movement = require('../physics/movement');
const placement = require('../physics/placement');
const { data } = require('../data');

class Play extends require('../types/Command') {
  constructor() {
    super();
  }

  async run(client, msg, args) {
    const worldRender = await msg.channel.send('Loading game view...');
    const healthRender = await msg.channel.send('Loading healthbar...');
    const hotbarRender = await msg.channel.send('Loading hotbar...');

    data.set(msg.author.id, { world, hotbar: hotbarRender, health: healthRender });

    await worldRender.edit(translateWorld(world, world.player.position.x, world.player.position.y));
    await movement(worldRender, msg.author);
    await placement(worldRender, msg.author);
    await healthRender.edit(renderHealthbar(world.player.hearts));
    await renderHotbar(hotbarRender, msg.author, world.player.inventory);
  }
}

module.exports = {
  run: Play,
  conf: {
    aliases: [],
    permLevel: 0
  },
  help: {
    name: `play`,
    description: ``,
    usage: `play`,
    helpSection: 'normal'
  }
};