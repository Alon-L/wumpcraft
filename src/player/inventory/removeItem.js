const { game: { blocks: { default: defaultBlock } } } = require('../../configs/default');

/**
 * @desc Remove an item from the player's inventory.
 * @param hotbar
 * @param slotNumber
 * @returns {boolean}
 */
function removeItem(hotbar, slotNumber) {
  const slot = hotbar[slotNumber];
  if (!slot.amount) return false;
  slot.amount--;
  // Sets the slot back to being empty if it has no blocks in it.
  if (!slot.amount) slot.name = defaultBlock;
  return true;
}

module.exports = removeItem;