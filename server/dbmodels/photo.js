"use strict";

module.exports = function (sequelize, DataTypes) {
  var Photo = sequelize.define("photo", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    thumbUrl: { type: DataTypes.STRING },
    zoomUrl: { type: DataTypes.STRING },
    originalUrl: { type: DataTypes.STRING },
    caption: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING(1024) },
    timestamp: { type: DataTypes.DATE }
  });

  Photo.associate = function (models) {
    Photo.belongsTo(models.location, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  }

  return Photo;
}
