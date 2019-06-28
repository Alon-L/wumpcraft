const { close } = require('./close');

function checkAFK(world, endAt, member) {
  const { x, y } = world.player.position;
  setTimeout(function() {
    if (world.player.position.x === x && world.player.position.y === y) {
      close(0, 'Member is AFK.', world, member);
    }
  }, endAt);
}

module.exports = checkAFK;