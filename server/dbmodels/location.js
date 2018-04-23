"use strict";

module.exports = function (sequelize, DataTypes) {
  var Location = sequelize.define("location", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    mapPositionX: { type: DataTypes.INTEGER },
    mapPositionY: { type: DataTypes.INTEGER },
    sortOrder: { type: DataTypes.INTEGER }
  });

  return Location;
}
