"use strict";

import fs  from 'fs';
import  path from 'path';
import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || "development";

// var config = require(path.join(__dirname, '../../config', 'config.json'))[env];

var dbSettings = {
  host: 'ian-odonnell.database.windows.net', //config.host,
  dialect: 'mssql',
  dialectOptions: {encrypt: true},
  pool: {
    min: 0, //config.connectionPools.min,
    max: 5, //config.connectionPools.max,
    idle: 10000 //config.connectionPools.idle
  },
  logging: true
};

var sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, dbSettings);
} else {
  // sequelize = new Sequelize(config.database, config.username, config.password, dbSettings);
  sequelize = new Sequelize('chievechat', 'ian-odonnell', '001T6NgTomzl', dbSettings);
}

var db = {};
var toLink = [];

// TODO: Maybe file scan the current directory (and children?) - Sequelize's import functionality was struggling once deployed to Azure,
// so dropped back to this hard-coded list of models for now
var models = [
  require('./achievement'),
  require('./achievementView'),
  require('./game'),
  require('./message'),
  require('./persona'),
  require('./steamuser')
];

models.forEach(model => {
  const sequelizeModel = model(sequelize, Sequelize);
  db[sequelizeModel.name] = sequelizeModel;
  if(sequelizeModel.associate) {
    toLink.push(sequelizeModel);
  }
});

toLink.forEach(model => {
  console.log(model);
  model.associate(sequelize.models);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
