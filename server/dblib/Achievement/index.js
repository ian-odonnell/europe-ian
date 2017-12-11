let models = require('../../dbmodels');

/* eslint-disable no-extra-boolean-cast */

exports.createAchievement = (achievementData, transaction) => {
  let txn = (!!transaction ? { transaction } : {});
  return models.achievement.create(achievementData, txn);
};

exports.getAllKnownAchievementsForGame = (appId) => {
  return new Promise((resolve) => {
    var gameAchievements = models.achievement.findAll({ where: { gameId: appId } });
    resolve(gameAchievements);
  });
};

exports.truncate = () => {
  return models.achievement.destroy({
    where: {}
  });
}
