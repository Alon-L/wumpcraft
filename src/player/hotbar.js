const { emojiFormat } = require('../utils/generalMethods');
const { getBlockInfo } = require('../world/blockMethods');
const addReactions = require('../utils/reactions/addReactions');
const reactionCollector = require('../utils/reactions/reactionCollector');
const { getData } = require('../data');

let msg;

const reactions = {
  1: '1⃣',
  2: '2⃣',
  3: '3⃣',
  4: '4⃣',
  5: '5⃣',
  6: '6⃣'
};

/**
 * @desc Adds the slot selection reactions to the hotbar message. When pressed set the pressed slot to be the selected one.
 * @param author
 * @param inventory
 * @returns {Promise<void>}
 */
async function hotbar(author, inventory) {
  const d = getData(author.id);
  if (!d) return;
  msg = d.hotbar;

  await msg.edit(renderHotbar(inventory));
  await addReactions(msg, ...Object.values(reactions));

  reactionCollector(msg, Object.values(reactions), author, function(r) {
    const slot = Object.keys(reactions).find(key => reactions[key] === r.emoji.name);
    inventory.selected = Number(slot);
    msg.edit(renderHotbar(inventory));
  });
}

/**
 * @desc Renders the player's hotbar into the hotbar message.
 * @param hotbar
 * @param selected
 * @returns {string|string}
 */
function renderHotbar({ hotbar, selected }) {
  let str = '';
  for (let i = 0; i < Object.values(hotbar).length; i++) {
    const item = Object.values(hotbar)[i];
    const amount = selected === i + 1
      ? `**__${item.amount}x__**`
      : `${item.amount}x`;
    str += `${amount} ${emojiFormat(getBlockInfo(item).id)}  `;
  }
  return str;
}

module.exports = {
  hotbar,
  renderHotbar
};