"use strict";

module.exports = function (sequelize, DataTypes) {
  var LocalUser = sequelize.define("localuser", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }
  });

  LocalUser.associate = function (models) {
    LocalUser.belongsTo(models.persona, { foreignKey: { allowNull: false } });
  }

  return LocalUser;
}
