/**
 * @desc Generate a random string including chars and ints.
 * @return {string}
 */
function genId(length) {
  let str = '';
  const opts = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    str += opts.charAt(Math.floor(Math.random() * opts.length));
  }
  return str;
}

module.exports = genId;