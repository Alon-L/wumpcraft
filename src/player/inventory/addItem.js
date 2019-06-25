function addItem(inventory, blockName) {
  const hotbar = Object.values(inventory.hotbar);
  if (hotbar.some(item => item.name === blockName)) {
    hotbar.forEach(item => {
      if (item.name === blockName) {
        item.amount++;
      }
    })
  } else {
    for (const item of hotbar) {
      if (item.name === 'sky') {
        item.name = blockName;
        item.amount = 1;
        break;
      }
    }
  }
}

module.exports = addItem;