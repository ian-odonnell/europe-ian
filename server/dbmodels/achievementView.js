"use strict";

module.exports = function (sequelize, DataTypes) {

  var AchievementView = sequelize.define("achievementView", {
    gameId: { type: DataTypes.INTEGER, primaryKey: true },
    achievementId: { type: DataTypes.INTEGER, primaryKey: true },
    personaId: { type: DataTypes.INTEGER, primaryKey: true },
  }, {
      tableName: "v_earnedAchievements",
      timestamps: false
    });

    AchievementView.sync = () => { Promise.resolve(); }
    AchievementView.drop = () => { Promise.resolve(); }

  return AchievementView;
}
