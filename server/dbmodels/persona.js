"use strict";

module.exports = function (sequelize, DataTypes) {
  var Persona = sequelize.define("persona", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    avatarUrl: { type: DataTypes.STRING },
    profileUrl: { type: DataTypes.STRING }
  });

  Persona.associate = function (models) {
    Persona.belongsTo(models.user, { foreignKey: { allowNull: false } });
  }

  return Persona;
}
