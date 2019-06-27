const blocksInfo = require('../configs/blocks');

/**
 * @desc Check if the block type exists in the config.
 * @param block
 * @returns {boolean}
 */
function blockExists(block) {
  return block.name in blocksInfo;
}

/**
 * @desc Gets all the information from the config about a certain block.
 * @param block
 * @returns {*}
 */
function getBlockInfo(block) {
  return blocksInfo[block.name];
}

/**
 * @desc Find the block in the given coordinates.
 * @param blocks
 * @param x
 * @param y
 * @returns {*}
 */
function findBlock(blocks, x, y) {
  return blocks[y][x];
}

/**
 * @desc Find all the blocks in the given range.
 * @param blocks
 * @param x1
 * @param x2
 * @param y1
 * @param y2
 * @returns {Array}
 */
function blocksInRange(blocks, x1, x2, y1, y2) {
  const inRange = [];
  for (let i = y1; i <= y2; i++) {
    for (let j = x1; j <= x2; j++) {
      inRange.push({ x: j, y: i, block: blocks[i][j] });
    }
  }
  return inRange;
}

/**
 * @desc Find all the blocks in the radius of a given coordinate.
 * @param blocks
 * @param x
 * @param y
 * @param radius
 * @returns {Array}
 */
function blocksInRadius(blocks, x, y, radius) {
  return blocksInRange(blocks, x - radius, x + radius, y - radius, y + radius);
}

/**
 * @desc Gets all the blocks in a certain row.
 * @param blocks
 * @param y
 * @returns {*}
 */
function getRow(blocks, y) {
  return blocks[y];
}

module.exports = {
  blockExists,
  getBlockInfo,
  findBlock,
  blocksInRadius,
  getRow
};