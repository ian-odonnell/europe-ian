let models = require('../../dbmodels');

/* eslint-disable no-extra-boolean-cast */

exports.getAllSteamUsers = () => {
  return new Promise((resolve) => {
    var allUsers = models.steamuser.findAll();
    resolve(allUsers);
  });
};

exports.truncate = () => {
  return models.steamuser.destroy({
    where: {}
  });
}
