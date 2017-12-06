"use strict";

module.exports = function (sequelize, DataTypes) {
  var Game = sequelize.define("game", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    steamId: {type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    logoUrl: { type: DataTypes.STRING }
  });

  Game.associate = function () {
  }

  return Game;
}
