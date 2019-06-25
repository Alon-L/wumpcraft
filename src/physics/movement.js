const path = require('path');
const fs = require('fs');
const addReactions = require('../utils/reactions/addReactions');
const reactionCollector = require('../utils/reactions/reactionCollector');
const { longestArrayLength, findKeyByValue } = require('../utils/generalMethods');
const translateWorld = require('../world/translateWorld');
const collision = require('./collision');
const gravity = require('./gravity');
const onMove = require('../player/onMove');
const { data } = require('../data');

let world, healthbar, hotbar;

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
 * @param msg
 * @param author
 * @returns {Promise<void>}
 */
async function movement(msg, author) {
  const d = data.get(author.id);
  world = d.world;
  healthbar = d.health;
  hotbar = d.hotbar;

  await addReactions(msg, reactions);

  reactionCollector(msg, reactions, author, getDirection);

  async function getDirection({ emoji: { name } }) {
    const direction = findKeyByValue(reactions, name);
    const crossPath = crossPaths[direction];
    if (crossPath) {
      return crossPath.forEach(async c => await getDirection({ emoji: { name: reactions[c] } }))
    }
    await handleMovement(msg, direction);
  }
}

/**
 * @desc Calculates where the player should be at after his movement
 * @param msg
 * @param direction
 */
async function handleMovement(msg, direction) {
  const { blocks, player: { position } } = world;

  const height = Number(Object.keys(blocks)[Object.keys(blocks).length - 1]);
  const width = longestArrayLength(Object.values(blocks));

  const x = position.x;
  const y = position.y;
  const [newX, newY] = directions[direction](x, y);

  if (newX === 0 || newY === 0 || newX === width + 1 || newY === height /* Count the player head */) return;

  /*
  Check for block collision. Don't move if block is not mineable.
   */
  if (collision(world, hotbar, newX, newY)) return;
  await move(msg, newX, newY);

  /*
  Check for gravity. Keep falling as long as there is not a solid block under the player.
   */
  for (let i = newY; i > 1 && gravity(world, newX, i); i--) {
    if (collision(world, hotbar, newX, i - 1)) break;
    await move(msg, newX, i - 1);
  }
}

/**
 * @desc Moves the player.
 */
async function move(msg, newX, newY) {
  const { position } = world.player;
  position.x = newX;
  position.y = newY;
  //console.log(newX, newY);
  //console.log(Object.keys(world.player));
  // TODO: Do not save file every update. Add an auto save every x minutes / when bot restarts / when members hit the save reaction
  fs.writeFileSync(path.join(__dirname, '../configs/world.json'), JSON.stringify(world, null, 2));
  await updateScene(msg, newX, newY);
  onMove(world, healthbar, newX, newY);
}

function updateScene(msg, newX, newY) {
  return msg.edit(translateWorld(world, newX, newY));
}

module.exports = movement;