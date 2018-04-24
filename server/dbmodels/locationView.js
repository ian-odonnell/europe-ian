"use strict";

module.exports = function (sequelize, DataTypes) {

  var LocationView = sequelize.define("locationView", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.STRING },
    mapPositionX: { type: DataTypes.INTEGER },
    mapPositionY: { type: DataTypes.INTEGER },
    sortOrder: { type: DataTypes.INTEGER },
    photosExist: { type: DataTypes.INTEGER }
  }, {
      tableName: "v_Locations",
      timestamps: false
    });

    LocationView.sync = () => { Promise.resolve(); }
    LocationView.drop = () => { Promise.resolve(); }

  return LocationView;
}
