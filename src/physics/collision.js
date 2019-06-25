const { findBlock, getBlockInfo } = require('../world/blockMethods');
const addItem = require('../player/inventory/addItem');
const { renderHotbar } = require('../player/hotbar');

// TODO: Make this global somewhere.
const defaultBlock = 'sky';

function collision({ blocks, player: { inventory } }, hotbar, x, y) {
  const collisionBlocks = {
    blocks: [
      findBlock(blocks, x, y),
      findBlock(blocks, x, y + 1)
    ],
    blocksInfo: []
  };

  collisionBlocks.blocks.forEach(async block => {
    const blockInfo = getBlockInfo(block);
    if (blockInfo.mineable && blockInfo.type === 'block') {
      addItem(inventory, block.name);
      block.name = defaultBlock;
    }
    collisionBlocks.blocksInfo.push(getBlockInfo(block));
  });

  hotbar.edit(renderHotbar(inventory));

  return collisionBlocks.blocksInfo.some(block => block.type === 'block' && !block.mineable && block.collision.player);
}

module.exports = collision;