const { getBlockInfo, findBlock } = require('../world/blockMethods');
const renderHealthbar = require('./healthbar');

function onMove(world, healthbar, newX, newY) {
  harm(world, healthbar);
}

async function harm(world, healthbar) {
  const { blocks, player: { position } } = world;
  for (let i = 0, block = _block(); block.harmful; i++, block = _block()) {
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });
    const hearts = world.player.hearts = world.player.hearts - block.harmful.lives;
    await healthbar.edit(renderHealthbar(hearts));
  }

  function _block() {
    return getBlockInfo(findBlock(blocks, position.x, position.y));
  }
}

module.exports = onMove;