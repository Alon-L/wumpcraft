const { emojiFormat } = require('../utils/generalMethods');
const { getBlockInfo } = require('../world/blockMethods');
const addReactions = require('../utils/reactions/addReactions');
const reactionCollector = require('../utils/reactions/reactionCollector');
const { data } = require('../data');

const reactions = {
  1: '1⃣',
  2: '2⃣',
  3: '3⃣',
  4: '4⃣',
  5: '5⃣',
  6: '6⃣'
};

async function hotbar(msg, author, inventory) {
  await msg.edit(renderHotbar(inventory));
  await addReactions(msg, reactions);

  reactionCollector(msg, reactions, author, function(r) {
    const slot = Object.keys(reactions).find(key => reactions[key] === r.emoji.name);
    inventory.selected = Number(slot);
    msg.edit(renderHotbar(inventory));
  });
}

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