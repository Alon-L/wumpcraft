const { fallDamage } = require('../configs/player');
const updateScene = require('../game/updateScene');
const renderHealthbar = require('../player/healthbar');
const addReactions = require('../utils/reactions/addReactions');
const reactionCollector = require('../utils/reactions/reactionCollector');
const { findBlock, getBlockInfo } = require('../world/blockMethods');
const { longestArrayLength, findKeyByValue } = require('../utils/generalMethods');
const collision = require('./collision');
const gravity = require('./gravity');
const onMove = require('../player/events/onMove');
const { getData, data } = require('../data');

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

/**
 * @desc Adds the ability to move using the reactions.
 * @returns {Promise<void>}
 * @param msg
 */
async function movement(msg) {
  const d = getData(msg.author.id);
  if (!d) return;

  const { worldRender } = d;

  await addReactions(worldRender, ...Object.values(reactions));

  reactionCollector(worldRender, Object.values(reactions), msg.author, getDirection);
  function getDirection({ emoji: { name } }) {
    const direction = findKeyByValue(reactions, name);
    const crossPath = crossPaths[direction];
    if (crossPath) {
      return crossPath.forEach(c => getDirection({ emoji: { name: reactions[c] } }));
    }
    handleMovement(direction, msg, getData(msg.author.id));
  }
}

/**
 * @desc Calculates where the player should be at after they move.
 * @param direction
 * @param msg
 * @param d
 */
async function handleMovement(direction, msg, d) {
  const { world, health, hotbar } = d;
  const { blocks, player: { position } } = world;

  const height = Number(Object.keys(blocks)[Object.keys(blocks).length - 1]);
  const width = longestArrayLength(Object.values(blocks));

  const x = position.x;
  const y = position.y;
  const [newX, newY] = directions[direction](x, y);

  if (newX === 0 || newY === 0 || newX === width + 1 || newY === height /* Count the player head */) return;

  // Check for block collision. Don't move if block is not mineable.
  if (collision(msg, hotbar, newX, newY)) return;
  await move(newX, newY, msg, d);

  // Check for gravity. Keep falling as long as there is not a solid block under the player.
  let fallDamageTaken;
  for (let i = newY, j = 1; i > 1 && gravity(world, newX, i); i--, j++) {
    const y = i - 1;
    if (collision(msg, hotbar, newX, y)) break;
    await move(newX, y, msg, d);
    fallDamageTaken = j;
    // Reset fall damage when touching liquid.
    if (getBlockInfo(findBlock(blocks, newX, y)).liquid) fallDamageTaken = 0;
  }

  if (fallDamageTaken >= fallDamage.min) {
    const hearts = world.player.hearts - fallDamage.lives(fallDamageTaken);
    const healthRender = renderHealthbar(hearts, msg, 'fall');
    if (healthRender) {
      await health.edit(healthRender);
    }
  }
}

/**
 * @desc Moves the player and update the file and the scene.
 */
async function move(newX, newY, msg, { worldRender, health, world }) {
  const { position } = world.player;
  position.x = newX;
  position.y = newY;

  await updateScene(worldRender, msg.author.id, world, newX, newY);
  onMove(msg, health, newX, newY);
}

module.exports = movement;