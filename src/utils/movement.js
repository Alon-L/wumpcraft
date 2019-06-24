const path = require('path');
const fs = require('fs');
const translateWorld = require('../utils/translateWorld');
const world = JSON.parse(fs.readFileSync(path.join(__dirname, '../configs/world.json')).toString());

const reactions = {
  left: '⬅',
  right: '➡',
  up: '⬆',
  down: '⬇'
};

// All the directions and a function returning the x and y when moving to that direction.
const directions = {
  left: (x, y) => [x - 1, y],
  right: (x, y) => [x + 1, y],
  up: (x, y) => [x, y + 1],
  down: (x, y) => [x, y - 1],
};

// TODO: Go through all the code here and in trnaslateWorld.js and clean it a bit.

/**
 * @desc Adds the proper movement reactions to the game message and adds a use to them to move in game.
 * @param msg
 * @param author
 * @returns {Promise<void>}
 */
async function movement(msg, author) {
  await msg.react(reactions.left);
  await msg.react(reactions.right);
  await msg.react(reactions.up);
  await msg.react(reactions.down);

  const filter = (reaction, user) => {
    return Object.values(reactions).includes(reaction.emoji.name) && user.id === author.id;
  };
  const collector = msg.createReactionCollector(filter, { time: false });
  collector.on('collect', async (r) => {
    r.remove(author);
    const direction = Object.keys(reactions).find(key => reactions[key] === r.emoji.name);
    await move(msg, direction);
  });
}

/**
 * @desc Moves the player in the world and edits the game message.
 * @param msg
 * @param direction
 * @returns {Promise<void>}
 */
async function move(msg, direction) {
  const x = world.player.position.x;
  const y = world.player.position.y;
  const [newX, newY] = directions[direction](x, y);
  world.player.position.x = newX;
  world.player.position.y = newY;
  fs.writeFileSync(path.join(__dirname, '../configs/world.json'), JSON.stringify(world, null, 2));
  await msg.edit(translateWorld(msg.client.emojis, world, newX, newY));
}

module.exports = movement;