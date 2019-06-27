const { getBlockInfo, findBlock } = require('../world/blockMethods');

/**
 * @desc Liquid blocks fall down when there is no solid block below them.
 * @param blocks
 * @param block
 * @param blockInfo
 * @param x
 * @param y
 */
function liquid(blocks, block, blockInfo, x, y) {
  for (let i = y - 1, newBlock = findBlock(blocks, x, i); !getBlockInfo(newBlock).collision.liquid; i--) {
    newBlock.name = block.name;
  }
}

module.exports = liquid;