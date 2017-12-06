"use strict";

module.exports = function (sequelize, DataTypes) {
  var Message = sequelize.define("message", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    timestamp: { type: DataTypes.DATE },
    body: { type: DataTypes.STRING },
  });

  Message.associate = function (models) {
    Message.belongsTo(models.persona, { foreignKey: { allowNull: false }, onDelete: 'NO ACTION' });
    Message.belongsTo(models.achievement);
    Message.hasMany(models.message, {as: 'replies', foreignKey: 'parentMessageId'});
  }

  return Message;
}
