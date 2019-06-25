const blocksInfo = require("../configs/blocks");

function blockExists(block) {
  return block.name in blocksInfo;
}

function getBlockInfo(block) {
  return blocksInfo[block.name];
}

function findBlock(blocks, x, y) {
  return blocks[y][x];
}

function blocksInRange(blocks, x1, x2, y1, y2) {
  const inRange = [];
  for (let i = y1; i <= y2; i++) {
      for (let j = x1; j <= x2; j++) {
          inRange.push({ x: j, y: i, block: blocks[i][j] });
      }
  }
  return inRange;
}

function blocksInRadius(blocks, x, y, radius) {
  return blocksInRange(blocks, x - radius, x + radius, y - radius, y + radius);
}

module.exports = {
  blockExists,
  getBlockInfo,
  findBlock,
  blocksInRadius
};