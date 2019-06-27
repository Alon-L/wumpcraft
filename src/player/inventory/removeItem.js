const { game: { blocks: { default: defaultBlock } } } = require('../../configs/default');

/**
 * @desc Remove an item from the player's inventory.
 * @param d
 * @param slotNumber
 * @param amount
 * @returns {boolean}
 */
function removeItem({ world: { player: { inventory: { hotbar } } }, collected }, slotNumber, amount) {
  const slot = hotbar[slotNumber];
  if (!slot.amount) return false;
  slot.amount -= amount;
  // Sets the slot back to being empty if it has no blocks in it.
  if (!slot.amount) slot.name = defaultBlock;
  return true;
}

module.exports = removeItem;