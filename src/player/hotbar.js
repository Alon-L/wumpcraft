const { emojiFormat } = require('../utils/generalMethods');
const { getBlockInfo } = require('../world/blockMethods');
const addReactions = require('../utils/reactions/addReactions');
const reactionCollector = require('../utils/reactions/reactionCollector');
const removeItem = require('../player/inventory/removeItem');
const { getData } = require('../data');

const reactions = {
  1: '1⃣',
  2: '2⃣',
  3: '3⃣',
  4: '4⃣',
  5: '5⃣',
  6: '6⃣',
  drop: '🗑'
};

/**
 * @desc Adds the slot selection reactions to the hotbar message. When pressed set the pressed slot to be the selected one.
 * @param member
 * @param inventory
 * @returns {Promise<void>}
 */
async function hotbar(member, inventory) {
  const d = getData(member.id);
  if (!d) return;
  const { hotbar: hotbarMsg } = d;

  await hotbarMsg.edit(renderHotbar(member, inventory));
  await addReactions(hotbarMsg, ...Object.values(reactions));

  reactionCollector(hotbarMsg, Object.values(reactions), member.user, function(r) {
    const slot = Object.keys(reactions).find(key => reactions[key] === r.emoji.name);
    if (slot === 'drop') {
      removeItem(d, inventory.selected, inventory.hotbar[inventory.selected].amount);
    } else {
      inventory.selected = Number(slot);
    }
    hotbarMsg.edit(renderHotbar(member, inventory));
  });
}

/**
 * @desc Renders the player's hotbar into the hotbar message.
 * @param member
 * @param hotbar
 * @param selected
 * @returns {string|string}
 */
function renderHotbar(member, { hotbar, selected }) {
  let str = '';
  for (let i = 0; i < Object.values(hotbar).length; i++) {
    const item = Object.values(hotbar)[i];
    const amount = selected === i + 1
      ? `**__${item.amount}x__**`
      : `${item.amount}x`;
    str += `${amount} ${emojiFormat(member, getBlockInfo(item).name)}  `;
  }
  return str;
}

module.exports = {
  hotbar,
  renderHotbar
};