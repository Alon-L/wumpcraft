/**
 * @desc Convert an emoji id into the actual emoji.
 * @param id {String}
 * @returns {*}
 */
function emojiFormat(id) {
  const { emojis } = require('../data');
  return emojis.get(id).toString();
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

function findKeyByValue(obj, value) {
  return Object.keys(obj).find(key => obj[key] === value);
}

function randNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
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

module.exports = {
  emojiFormat,
  longestArrayLength,
  findKeyByValue,
  randNumberBetween,
  getInRange
};