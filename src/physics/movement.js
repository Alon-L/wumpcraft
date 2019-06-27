const path = require('path');
const fs = require('fs');
const { fallDamage } = require('../configs/player');
const updateScene = require('../game/updateScene');
const renderHealthbar = require('../player/healthbar');
const addReactions = require('../utils/reactions/addReactions');
const reactionCollector = require('../utils/reactions/reactionCollector');
const { longestArrayLength, findKeyByValue } = require('../utils/generalMethods');
const collision = require('./collision');
const gravity = require('./gravity');
const onMove = require('../player/events/onMove');
const { getData } = require('../data');

const reactions = {
  topleft: '↖',
  left: '⬅',
  up: '⬆',
  down: '⬇',
  right: '➡',
  topright: '↗'
};

const crossPaths = {
  topleft: ['up', 'left'],
  topright: ['up', 'right']
};

// All the directions and a function returning the x and y when moving to that direction.
const directions = {
  left: (x, y) => [x - 1, y],
  right: (x, y) => [x + 1, y],
  up: (x, y) => [x, y + 1],
  down: (x, y) => [x, y - 1]
};

let world, healthbar, hotbar, worldRender, msg;

/**
 * @desc Adds the ability to move using the reactions.
 * @returns {Promise<void>}
 * @param _msg
 */
async function movement(_msg) {
  const d = getData(_msg.author.id);
  if (!d) return;
  world = d.world;
  healthbar = d.health;
  hotbar = d.hotbar;
  worldRender = d.worldRender;
  msg = _msg;

  await addReactions(worldRender, ...Object.values(reactions));

  reactionCollector(worldRender, Object.values(reactions), msg.author, getDirection);

  async function getDirection({ emoji: { name } }) {
    const direction = findKeyByValue(reactions, name);
    const crossPath = crossPaths[direction];
    if (crossPath) {
      return crossPath.forEach(async c => await getDirection({ emoji: { name: reactions[c] } }))
    }
    await handleMovement(direction);
  }
}

/**
 * @desc Calculates where the player should be at after they move.
 * @param direction
 */
async function handleMovement(direction) {
  const { blocks, player: { position } } = world;

  const height = Number(Object.keys(blocks)[Object.keys(blocks).length - 1]);
  const width = longestArrayLength(Object.values(blocks));

  const x = position.x;
  const y = position.y;
  const [newX, newY] = directions[direction](x, y);

  if (newX === 0 || newY === 0 || newX === width + 1 || newY === height /* Count the player head */) return;

  // Check for block collision. Don't move if block is not mineable.
  if (collision(msg, hotbar, newX, newY)) return;
  await move(newX, newY);


  // Check for gravity. Keep falling as long as there is not a solid block under the player.
  let fallDamageTaken;
  for (let i = newY, j = 1; i > 1 && gravity(world, newX, i); i--, j++) {
    if (collision(msg, hotbar, newX, i - 1)) break;
    await move(newX, i - 1);
    fallDamageTaken = j;
  }

  if (fallDamageTaken >= fallDamage.min) {
    const hearts = world.player.hearts - fallDamage.lives(fallDamageTaken);
    const health = renderHealthbar(hearts, msg, 'fall');
    if (health) {
      await healthbar.edit(health);
    }
  }
}

/**
 * @desc Moves the player and update the file and the scene.
 */
async function move(newX, newY) {
  const { position } = world.player;
  position.x = newX;
  position.y = newY;

  fs.writeFileSync(path.join(__dirname, `../saves/${msg.author.id}.json`), JSON.stringify(world, null, 2));
  await updateScene(worldRender, world, newX, newY);
  onMove(msg, healthbar, newX, newY);
}

module.exports = movement;