"use strict";

module.exports = function (sequelize, DataTypes) {
  var Achievement = sequelize.define("achievement", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    apiName: { type: DataTypes.STRING },
    displayName: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    iconUrl: { type: DataTypes.STRING }
  });

  Achievement.associate = function (models) {
    Achievement.belongsTo(models.game, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  }

  return Achievement;
}
