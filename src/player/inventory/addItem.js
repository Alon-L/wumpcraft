const { game: { blocks: { default: defaultBlock } } } = require('../../configs/default');

/**
 * @desc Adds a new block to the player's inventory.
 * @param inventory
 * @param blockName
 */
function addItem(inventory, blockName) {
  const hotbar = Object.values(inventory.hotbar);
  // If block already exists in the player's inventory
  if (hotbar.some(item => item.name === blockName)) {
    hotbar.forEach(item => {
      if (item.name === blockName) {
        item.amount++;
      }
    });
  } else {
    for (const item of hotbar) {
      // Add this block to the player's inventory instead of an empty slot.
      if (item.name === defaultBlock) {
        item.name = blockName;
        item.amount = 1;
        break;
      }
    }
  }
}

module.exports = addItem;