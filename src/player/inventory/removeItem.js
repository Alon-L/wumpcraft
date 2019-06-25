function removeItem(hotbar, slotNumber) {
  const slot = hotbar[slotNumber];
  if (!slot.amount) return false;
  slot.amount--;
  return true;
}

module.exports = removeItem;