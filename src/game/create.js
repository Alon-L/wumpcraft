const fs = require('fs');
const path = require('path');
const { game: { blocks: { default: defaultBlock } } } = require('../configs/default');
const { randNumberBetween } = require('../utils/generalMethods');
const { getRow } = require('../world/blockMethods');
const generateOres = require('../world/generateOres');

const original = JSON.parse(fs.readFileSync(path.join(__dirname + '../../configs/world.json')).toString());

/**
 * @desc Create a new world and generate new random spawn coordinates.
 * @param msg
 * @returns {any}
 */
function create(msg) {
  // Generate random player spawn position.
  let x, y;
  y = randNumberBetween(20, 22);
  try {
    x = randomX(y);
    original.player.position = { y: y + 1, x };
  } catch(err) {}

  generateOres(original.blocks);

  fs.writeFileSync(path.join(__dirname + `../../saves/${msg.author.id}.json`), JSON.stringify(original, null, 2));
  return JSON.parse(JSON.stringify(original));
}

/**
 * @desc Find a proper x position for spawning.
 * @param y
 * @returns {Number}
 */
function randomX(y) {
  const row = getRow(original.blocks, y);
  const x = randNumberBetween(1, Object.keys(row).length);
  return row[x].name === 'grass' &&
  getRow(original.blocks, y + 1)[x].name === defaultBlock &&
  getRow(original.blocks, y + 2)[x].name === defaultBlock
    ? x
    : randomX(y);
}

module.exports = create;