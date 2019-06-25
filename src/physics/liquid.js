const { getBlockInfo, findBlock } = require("../world/blockMethods");

function liquid(blocks, block, blockInfo, x, y) {
  for (let i = y - 1, newBlock = findBlock(blocks, x, i); !getBlockInfo(newBlock).collision.liquid; i--) {
    newBlock.name = block.name;
  }
}

module.exports = liquid;