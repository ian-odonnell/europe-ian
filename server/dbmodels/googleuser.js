"use strict";

module.exports = function (sequelize, DataTypes) {
  var SteamUser = sequelize.define("steamuser", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    steamId: { type: DataTypes.STRING }
  });

  SteamUser.associate = function (models) {
    SteamUser.belongsTo(models.persona, { foreignKey: { allowNull: false } });
  }

  return SteamUser;
}
