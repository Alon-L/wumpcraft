const { findBlock, getBlockInfo } = require('../world/blockMethods');
const { game: { blocks: { default: defaultBlock } } } = require('../configs/default');
const onGetBlock = require('../player/events/onGetBlock');
const addItem = require('../player/inventory/addItem');
const { renderHotbar } = require('../player/hotbar');
const { getData } = require('../data');

/**
 * @desc Check for block collision between the player and the block they are standing on after they moved.
 * @param msg
 * @param hotbar
 * @param x
 * @param y
 * @returns {boolean|?}
 */
function collision(msg, hotbar, x, y) {
  const d = getData(msg.author.id);
  if (!d) return;

  const { world: { blocks, player: { inventory } } } = d;
  const collisionBlocks = {
    blocks: [
      findBlock(blocks, x, y),
      findBlock(blocks, x, y + 1)
    ],
    blocksInfo: []
  };

  // Mines the block if mineable and adds the block to the player's inventory.
  collisionBlocks.blocks.forEach(async block => {
    const blockInfo = getBlockInfo(block);
    if (blockInfo.mineable && blockInfo.type === 'block') {
      // New item is added to the player's inventory.
      onGetBlock(msg, block.name);
      addItem(inventory, block.name);
      block.name = defaultBlock;
    }
    collisionBlocks.blocksInfo.push(getBlockInfo(block));
  });
  hotbar.edit(renderHotbar(inventory));

  // If block is mineable by the player.
  return collisionBlocks.blocksInfo
    .some(block => block.type === 'block' && !block.mineable && block.collision.player);
}

module.exports = collision;