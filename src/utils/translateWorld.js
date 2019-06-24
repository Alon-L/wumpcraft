const blocksInfo = require('../configs/blocks');
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
 * @param emojis
 * @param blocks {Object}
 * @param x {Number}
 * @param y {Number}
 * @returns {string} - Discord formatted for all the emojis.
 */
function translateWorld(emojis, { blocks }, x, y) {
  const height = Number(Object.keys(blocks)[Object.keys(blocks).length - 1]);
  const width = longestArrayLength(Object.values(blocks));

  /*
  These values are used to determine the space of view between a barrier and the player.
   */
  const maxDownBeforeDisappearance = rowsInViewHalf + 1;
  const maxUpBeforeDisappearance = height - rowsInViewHalf - 1;
  const maxLeftBeforeDisappearance = 1;
  const maxRightBeforeDisappearance = width;

  console.log(height, width);

  let y1, y2, x1, x2;

  /*
  Set the view points based on the barriers.
   */
  if (y < maxDownBeforeDisappearance) {
    console.log('Down');
    y1 = y + rowsInViewHalf - 1;
    y2 = y - (y - 1);
  } else if (y > maxUpBeforeDisappearance) {
    console.log('Up');
    y1 = y + (height - y);
    y2 = y - (rowsInViewHalf - 1);
  } else {
    console.log('Normal Vertical');
    y1 = y + rowsInViewHalf - 1;
    y2 = y - rowsInViewHalf;
  }
  if (x - blocksInRowHalf < maxLeftBeforeDisappearance) {
    console.log('Left');
    x2 = x - (x - 1);
    x1 = x + (blocksInRow - 1 - (x - 1));
  } else if (x + blocksInRowHalf > maxRightBeforeDisappearance) {
    console.log('Right');
    x2 = x - (x - blocksInRowHalf);
    x1 = x + (blocksInRow - 1 - (x - blocksInRowHalf));
  } else {
    console.log('Normal Horizontal');
    x1 = x + blocksInRowHalf;
    x2 = x - blocksInRowHalf;
  }

  let str = '';
  let yAxis = y1;
  let xAxis = x2 - 1;

  console.log(y1, y2, x1, x2);
  /*
  Loop through the map rows ranging between the two y points.
   */
  Object.values(getInRange(y2, y1, blocks))
    .reverse()
    .forEach((row) => {
      /*
      Loop through the map blocks ranging between the two x points.
       */
      str += Object.values(getInRange(x2, x1, row))
          .map((block) => {
            xAxis++;
            console.log(xAxis, x);
            /*
            Determine if the spot deserves a normal block or the player entity.
             */
            if (Number(yAxis) === y && Number(xAxis) === x)
              return emojiFormat(emojis, playerInfo.body.id);
            if (Number(yAxis) === y + 1 && Number(xAxis) === x)
              return emojiFormat(emojis, playerInfo.skull.id);
            if (block.name in blocksInfo)
              return emojiFormat(emojis, blocksInfo[block.name].id);
          })
          .join(' ')
        + '\n';
      yAxis--;
      xAxis = x2 - 1;
    });
  return str.length > 0
    ? str + `\n${x}, ${y}`
    : 'An error has occurred';
}

/**
 * @desc Checks for the length of the longest array inside this array full of other arrays.
 * @param arr {Array}
 * @returns {number}
 */
function longestArrayLength(arr) {
  let longest = 0;
  arr.forEach(a => {
    longest = Math.max(Object.keys(a).length, longest);
  });
  return longest;
}

/**
 * @desc Get all the object entries ranging between two numbers.
 * @param num1 {Number}
 * @param num2 {Number}
 * @param obj {Object}
 * @returns {Array}
 */
function getInRange(num1, num2, obj) {
  const res = [];
  for (let i = num1; i <= num2; i++) {
      res.push(obj[i]);
  }
  return res;
}

/**
 * @desc Convert an emoji id into the actual emoji.
 * @param emojis
 * @param id {String}
 * @returns {*}
 */
function emojiFormat(emojis, id) {
  return emojis.get(id).toString();
}

module.exports = translateWorld;