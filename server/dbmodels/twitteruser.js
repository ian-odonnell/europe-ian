"use strict";

module.exports = function (sequelize, DataTypes) {
  var TwitterUser = sequelize.define("twitteruser", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    twitterId: { type: DataTypes.STRING }
  });

  TwitterUser.associate = function (models) {
    TwitterUser.belongsTo(models.persona, { foreignKey: { allowNull: false } });
  }

  return TwitterUser;
}
