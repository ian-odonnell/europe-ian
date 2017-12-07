"use strict";

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
  });

  User.associate = function (models) {
    User.hasMany(models.persona);
  }

  return User;
}
