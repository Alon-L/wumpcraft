const staffRoles = require('../configs/staffRoles');

function permLevel(msg) {
  let permlvl = 0;
  if (!msg.member) return permlvl;
  for (const roleName of staffRoles) {
    const role = msg.guild.roles.find(r => r.name === roleName);
    if (role) {
      if (msg.member.roles.has(role.id)) permlvl = 1;
    }
  }
  if (msg.member.id === msg.guild.ownerID) permlvl = 2;
  return permlvl;
}

module.exports = permLevel;