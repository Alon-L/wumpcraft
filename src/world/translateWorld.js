const { blockExists, getBlockInfo } = require('./blockMethods');
const { emojiFormat, longestArrayLength, getInRange } = require('../utils/generalMethods');
const liquid = require('../physics/liquid');
const playerInfo = require('../configs/player');

/**
 * @desc Convert world generation json into discord based text.
 * @param data {Object}
 */
const blocksInRow = 13;
const blocksInRowHalf = Math.floor(blocksInRow / 2);
/*
Calculate the amount of rows allowed in a view.
2000 stands for the characters limit in a discord message.
25 stands for the length of an emoji and an additional space.
1 stands for the additional space at the end of the line that needs to be removed.
 */
const rowsInView = Math.floor(2000 / (25 * blocksInRow - 1));
const rowsInViewHalf = Math.floor(rowsInView / 2);

/**
 * @desc Convert the world's json format into plain text with Discord based emojis. Also changes the view around the player based on their coordinates.
 * @param world {Object}
 * @param x {Number}
 * @param y {Number}
 * @returns {string} - Discord formatted for all the emojis.
 */
function translateWorld(world, x, y) {
  const { blocks } = world;
  const height = Number(Object.keys(blocks)[Object.keys(blocks).length - 1]);
  const width = longestArrayLength(Object.values(blocks));

  /*
  These values are used to determine the space of view between a barrier and the player.
   */
  const maxDownBeforeDisappearance = rowsInViewHalf + 1;
  const maxUpBeforeDisappearance = height - rowsInViewHalf - 1;
  const maxLeftBeforeDisappearance = 1;
  const maxRightBeforeDisappearance = width;

  let y1, y2, x1, x2;

  /*
  Set the view points based on the barriers.
   */
  if (y < maxDownBeforeDisappearance) {
    y1 = y + rowsInViewHalf - 1;
    y2 = y - (y - 1);
  } else if (y > maxUpBeforeDisappearance) {
    y1 = y + (height - y);
    y2 = y - (rowsInViewHalf - 1);
  } else {
    y1 = y + rowsInViewHalf - 1;
    y2 = y - rowsInViewHalf;
  }
  if (x - blocksInRowHalf < maxLeftBeforeDisappearance) {
    x2 = x - (x - 1);
    x1 = x + (blocksInRow - 1 - (x - 1));
  } else if (x + blocksInRowHalf > maxRightBeforeDisappearance) {
    x1 = x + (width - x);
    x2 = x - (blocksInRow - 1 - (width - x));
  } else {
    x1 = x + blocksInRowHalf;
    x2 = x - blocksInRowHalf;
  }

  let str = '';
  let yAxis = y1;
  let xAxis = x2 - 1;


  // Loop through the map rows ranging between the two y points.
  Object.values(getInRange(y2, y1, blocks))
    .reverse()
    .forEach((row) => {
      // Loop through the map blocks ranging between the two x points.
      str += Object.values(getInRange(x2, x1, row))
          .map((block) => {
            xAxis++;
            // Determine if the spot deserves a normal block or the player entity.
            if (Number(yAxis) === y && Number(xAxis) === x) {
              return emojiFormat(playerInfo.body.id);
            }
            if (Number(yAxis) === y + 1 && Number(xAxis) === x) {
              return emojiFormat(playerInfo.skull.id);
            }
            if (blockExists(block)) {
              const blockInfo = getBlockInfo(block);
              if (blockInfo.liquid) liquid(blocks, block, blockInfo, xAxis, yAxis);
              return emojiFormat(blockInfo.id);
            }
          })
          .join(' ')
        + '\n';
      yAxis--;
      xAxis = x2 - 1;
    });
  return str.length > 0
    ? str + `\n__Score:__ ${world.player.score.reduce((acc, curr) => acc + curr, 0)}\n${x} ${y}`
    : 'An error has occurred';
}

module.exports = translateWorld;