const updateScene = require('../game/updateScene');
const addReactions = require('../utils/reactions/addReactions');
const reactionCollector = require('../utils/reactions/reactionCollector');
const { findBlock, getBlockInfo } = require('../world/blockMethods');
const removeItem = require('../player/inventory/removeItem');
const { renderHotbar } = require('../player/hotbar');
const { getData } = require('../data');

let world, hotbarMsg, msg;

const reactions = {
  left: '◀',
  up: '🔼',
  down: '🔽',
  right: '▶',
};

// All the directions and a function returning the x and y when placing a block in that direction.
const directions = {
  left: (x, y) => [x - 1, y],
  right: (x, y) => [x + 1, y],
  up: (x, y) => [x, y + 2], // A block above the head
  down: (x, y) => [x, y - 1],
};

/**
 * @desc Adds the placement reactions to the world render message and place a block whenever they are pressed.
 * @param member
 * @returns {Promise<void>}
 */
async function placement(member) {
  const d = getData(member.id);
  if (!d) return;
  world = d.world;
  hotbarMsg = d.hotbar;
  msg = d.worldRender;

  await addReactions(msg, ...Object.values(reactions));

  reactionCollector(msg, Object.values(reactions), member.user, async function(r) {
    const { player: { position: { x, y } } } = world;
    const direction = Object.keys(reactions).find(key => reactions[key] === r.emoji.name);
    const res = await handlePlace(direction);
    if (!res) return;
    place(...res);
    await updateScene(msg, world, x, y);
  });
}

/**
 * @desc Handles the placement event and check for any invalid block that could not be replaced.
 * @param direction
 * @returns {Promise<boolean|*>}
 */
async function handlePlace(direction) {
  const { blocks, player: { position, inventory } } = world;
  const { hotbar, selected } = inventory;
  const x = position.x;
  const y = position.y;
  const [newX, newY] = directions[direction](x, y);
  const block = JSON.parse(JSON.stringify(hotbar[selected]));
  if (!getBlockInfo(findBlock(blocks, newX, newY)).replaceable) return false;
  if (!removeItem(hotbar, selected)) return false;
  hotbarMsg.edit(renderHotbar(inventory));
  return getBlockInfo(findBlock(blocks, newX, newY)).replaceable
    ? [ newX, newY, block ]
    : false;
}

/**
 * @desc Places the block in the given position.
 * @param newX
 * @param newY
 * @param block
 */
function place(newX, newY, block) {
  const { blocks } = world;
  blocks[newY][newX] = { name: block.name };
}

module.exports = placement;