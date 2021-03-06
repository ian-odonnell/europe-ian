"use strict";

import Sequelize from 'sequelize';
import config from '../../config';

// var config = require(path.join(__dirname, '../../config', 'config.json'))[env];

var dbSettings = {
  host: config.databaseHost,
  dialect: 'mssql',
  dialectOptions: {encrypt: true},
  pool: {
    min: 0,
    max: 5,
    idle: 10000
  },
  logging: true
};

var sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, dbSettings);
} else {
  // sequelize = new Sequelize(config.database, config.username, config.password, dbSettings);
  sequelize = new Sequelize(config.databaseName, config.databaseUser, config.databasePassword, dbSettings);
}

var db = {};
var toLink = [];

// TODO: Maybe file scan the current directory (and children?) - Sequelize's import functionality was struggling once deployed to Azure,
// so dropped back to this hard-coded list of models for now
var models = [
  require('./location'),
  require('./locationView'),
  require('./photo')
];

models.forEach(model => {
  const sequelizeModel = model(sequelize, Sequelize);
  db[sequelizeModel.name] = sequelizeModel;
  if(sequelizeModel.associate) {
    toLink.push(sequelizeModel);
  }
});

toLink.forEach(model => {
  model.associate(sequelize.models);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// module.exports = db;
export default db;
