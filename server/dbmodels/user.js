"use strict";

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
  });

  User.associate = function () {
  }

  return User;
}
