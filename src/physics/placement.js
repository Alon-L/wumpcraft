const { game: { blocks: { default: defaultBlock } } } = require('../configs/default');
const updateScene = require('../game/updateScene');
const addReactions = require('../utils/reactions/addReactions');
const reactionCollector = require('../utils/reactions/reactionCollector');
const { findBlock, getBlockInfo } = require('../world/blockMethods');
const removeItem = require('../player/inventory/removeItem');
const { renderHotbar } = require('../player/hotbar');
const { getData } = require('../data');

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

  const { world, worldRender: msg } = d;

  await addReactions(msg, ...Object.values(reactions));
  reactionCollector(msg, Object.values(reactions), member.user, async function(r) {
    const { player: { position: { x, y } } } = world;
    const direction = Object.keys(reactions).find(key => reactions[key] === r.emoji.name);
    const res = await handlePlace(member, direction, d);
    if (!res) return;
    place(...res, world);
    await updateScene(d, msg, member.id, world, x, y);
  });
}

/**
 * @desc Handles the placement event and check for any invalid block that could not be replaced.
 * @param member
 * @param direction
 * @param d
 * @returns {Promise<boolean|*>}
 */
async function handlePlace(member, direction, { collected, world, hotbar: hotbarMsg }) {
  const { blocks, player: { position, inventory } } = world;
  const { hotbar, selected } = inventory;
  const x = position.x;
  const y = position.y;
  const [newX, newY] = directions[direction](x, y);
  const block = JSON.parse(JSON.stringify(hotbar[selected]));
  const blockInfo = getBlockInfo(block);
  // Block is not replaceable.
  if (!getBlockInfo(findBlock(blocks, newX, newY)).replaceable) return false;
  // Remove the block from the hotbar. If failed cancel the event.
  if (!removeItem({ world, collected }, selected, 1)) return false;
  // Cancel the place event if block can not float and there is no block below it.
  if (findBlock(blocks, newX, newY - 1).name === defaultBlock && !blockInfo.float) return false;
  hotbarMsg.edit(renderHotbar(member, inventory));
  return getBlockInfo(findBlock(blocks, newX, newY)).replaceable
    ? [ newX, newY, block ]
    : false;
}

/**
 * @desc Places the block in the given position.
 * @param newX
 * @param newY
 * @param block
 * @param world
 */
function place(newX, newY, block, world) {
  const { blocks } = world;
  blocks[newY][newX] = { name: block.name, placed: true };
}

module.exports = placement;