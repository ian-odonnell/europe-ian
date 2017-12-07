"use strict";

module.exports = function (sequelize, DataTypes) {
  var GoogleUser = sequelize.define("googleuser", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    googleId: { type: DataTypes.STRING }
  });

  GoogleUser.associate = function (models) {
    GoogleUser.belongsTo(models.persona, { foreignKey: { allowNull: false } });
  }

  return GoogleUser;
}
