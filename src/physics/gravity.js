const { findBlock, getBlockInfo } = require('../world/blockMethods');

/**
 * @desc Drops player down when they are in the air.
 * @param blocks
 * @param position
 * @param x
 * @param y
 * @returns {boolean}
 */
function gravity({ blocks, player: { position } }, x, y) {
  if (!getBlockInfo(findBlock(blocks, x, y - 1)).collision.player) {
    // Fall down if the position hasn't already changed.
    return position.x === x && position.y === y;
  }
}

module.exports = gravity;