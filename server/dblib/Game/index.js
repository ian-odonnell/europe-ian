let models = require('../../dbmodels');

/* eslint-disable no-extra-boolean-cast */

exports.createGame = (gameData, transaction) => {
    let txn = (!!transaction ? { transaction } : {});
    return models.game.create(gameData, txn);
};

exports.getAllGames = () => {
  return new Promise((resolve) => {
    var allGames = models.game.findAll();
    resolve(allGames);
  });
};

exports.truncate = () => {
  return models.game.destroy({
    where: {}
  });
}
