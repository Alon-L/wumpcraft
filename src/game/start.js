const fs = require('fs');
const path = require('path');
const worldExists = require('../world/worldExists');
const { close, closeReactions } = require('./close');
const create = require('./create');
const createChannel = require('./createChannel');
const renderHealthbar = require('../player/healthbar');
const renderAchievements = require('../player/achievements/renderAchievements');
const { hotbar: renderHotbar } = require('../player/hotbar');
const translateWorld = require('../world/translateWorld');
const movement = require('../physics/movement');
const placement = require('../physics/placement');
const { data, getData } = require('../data');

const instructions = fs.readFileSync(path.join(__dirname + '../../configs/instructions.txt')).toString();

async function start(msg) {
  const channel = await createChannel(msg);

  const world = getWorld(msg);

  const d = getData(msg.author.id);
  if (d && d.guildId === msg.guild.id) return msg.reply(`you already have an open game on ${channel}`);
  // Close any open games on other servers by this user.
  else if (d) close(0, 'New game instance was started.', world, msg.author, d.guildId, msg.client.guilds);

  msg.reply(`your game has been created in ${channel}`)
    .then((reply) => reply.delete(10000));

  const [instructions, achievementsRender, worldRender, healthRender, hotbarRender] = await sendMessages(channel);

  // Sets the data of this game view in the global data map.
  data.set(msg.author.id,
    {
      guildId: msg.guild.id,
      achievementsRender,
      world,
      worldRender,
      hotbar: hotbarRender,
      health: healthRender,
      score: world.player.score,
      collectors: [],
      collected: world.player.collected,
      channel,
      achievements: world.player.achievements,
      instructions,
    });

  // Edit all the game view messages and start the game.
  await achievementsRender.edit(renderAchievements(world.player.achievements));
  await worldRender.edit(translateWorld(world, world.player.position.x, world.player.position.y));
  await movement(msg);
  await placement(msg.member);
  await healthRender.edit(renderHealthbar(world.player.hearts, msg, 'initial'));
  await renderHotbar(msg.author, world.player.inventory);
  await closeReactions(worldRender, msg.member);
}

function getWorld(msg) {
  return worldExists(msg.author.id)
    ? JSON.parse(fs.readFileSync(path.join(__dirname + `../../saves/${msg.author.id}.json`)).toString())
    : create(msg);
}

function sendMessages(channel) {
  return Promise.all([
    channel.send(instructions),
    channel.send('Loading achievements...'),
    channel.send('Loading game view...'),
    channel.send('Loading healthbar...'),
    channel.send('Loading hotbar...')
  ]);
}

module.exports = start;