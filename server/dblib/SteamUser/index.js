import models from '../../dbmodels';

/* eslint-disable no-extra-boolean-cast */

exports.createSteamUser = (steamUserData, transaction) => {
  let txn = (!!transaction ? { transaction } : {});
  return models.steamuser.create(steamUserData, txn);
};

exports.getSteamUsers = (where) => {
  return new Promise((resolve) => {
    var allUsers = models.steamuser.findAll({where});
    resolve(allUsers);
  });
};

exports.truncate = () => {
  return models.steamuser.destroy({
    where: {}
  });
}
