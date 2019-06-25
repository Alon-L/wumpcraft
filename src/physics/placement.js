const translateWorld = require('../world/translateWorld');
const addReactions = require('../utils/reactions/addReactions');
const reactionCollector = require('../utils/reactions/reactionCollector');
const { findBlock, getBlockInfo } = require('../world/blockMethods');
const removeItem = require('../player/inventory/removeItem');
const { renderHotbar } = require('../player/hotbar');
const { data } = require('../data');

let world, hotbarMsg;

const reactions = {
  left: '◀',
  up: '🔼',
  down: '🔽',
  right: '▶',
};

// TODO: Add close view reaction (not in this file).

// All the directions and a function returning the x and y when placing a block in that direction.
const directions = {
  left: (x, y) => [x - 1, y],
  right: (x, y) => [x + 1, y],
  up: (x, y) => [x, y + 2], // A block above the head
  down: (x, y) => [x, y - 1],
};

async function placement(msg, author) {
  const d = data.get(author.id);
  world = d.world;
  hotbarMsg = d.hotbar;

  await addReactions(msg, reactions);

  reactionCollector(msg, reactions, author, async function(r) {
    const { player: { position: { x, y } } } = world;
    const direction = Object.keys(reactions).find(key => reactions[key] === r.emoji.name);
    const res = await handlePlace(direction);
    if (!res) return;
    place(msg, ...res);
    updateScene(msg, x, y);
  });
}

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

function place(msg, newX, newY, block) {
  const { blocks } = world;
  blocks[newY][newX] = { name: block.name };
}

function updateScene(msg, newX, newY) {
  return msg.edit(translateWorld(world, newX, newY));
}

module.exports = placement;