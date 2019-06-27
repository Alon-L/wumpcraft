const { getBlockInfo, findBlock } = require('../../world/blockMethods');
const renderHealthbar = require('../healthbar');
const achievementsConf = require('../../configs/achievements');
const addAchievement = require('../achievements/addAchievement');
const { getData } = require('../../data');
const method = 'position';

let msg, world, achievements;

function onMove(_msg, healthbar, newX, newY) {
  const d = getData(_msg.author.id);
  if (!d) return;

  msg = _msg;
  achievements = d.achievements;
  world = d.world;
  checkForAchievement(newX, newY);
  blockHarm(healthbar);
}

function checkForAchievement(newX, newY) {
  for (const { verify: { method: _method, block, below, y }, id } of achievementsConf) {
    if (_method !== method) continue;
    if (achievements.includes(id)) continue;
    if (y) {
      if (newY !== y) continue;
    } else if (block && below !== undefined) {
      if (block !== findBlock(world.blocks, newX, newY - below).name) continue;
    } else continue;
    addAchievement(msg.member, id);
  }
}

/**
 * @desc Handles any damage caused by a certain type of block when the player moves.
 * @param healthbar
 * @returns {Promise<void>}
 */
async function blockHarm(healthbar) {
  const { author } = msg;
  const { blocks, player: { position } } = world;
  for (let i = 0, block = _block(), headBlock = _headBlock();
       getData(author.id) && (block.harmful || headBlock.harmful);
       i++, block = _block(), headBlock = _headBlock()
  ) {
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });

    const blockDamage = block.harmful
      ? block.harmful.lives
      : 0;

    const headBlockDamage = headBlock.harmful
      ? headBlock.harmful.lives
      : 0;

    const hearts = world.player.hearts - Math.max(blockDamage, headBlockDamage);
    const health = renderHealthbar(hearts, msg, block.name);
    if (health) {
      healthbar.edit(health)
        .catch(() => {});
    }
  }

  /**
   * @desc Returns all the information of the block in the height of the player's head.
   * @private
   */
  function _headBlock() {
    return _block(position.y + 1);
  }

  /**
   * @desc Returns all the information of the block in the height of the player.
   * @param y
   * @returns {*}
   * @private
   */
  function _block(y = position.y) {
    return getBlockInfo(findBlock(blocks, position.x, y));
  }
}

module.exports = onMove;