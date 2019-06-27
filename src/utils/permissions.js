const required = require('../configs/permissions');

/**
 * @desc Checks for missing client permissions for the server.
 * @param client
 */
function permissions(client) {
  const missing = [];
  Object.entries(required).forEach(([perm, name]) => {
    if (!client.hasPermission(perm)) missing.push(name);
  });
  return missing;
}

module.exports = permissions;