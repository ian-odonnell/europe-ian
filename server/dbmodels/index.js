"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";

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
  // var sequelize = new Sequelize(config.database, config.username, config.password, config);
  // var sequelize = new Sequelize('one-goal', 'sa', '106Points', { host: 'localhost', dialect: 'mysql', pool: { max: 5, min: 0, idle: 10000 } });
  // sequelize = new Sequelize(config.database, config.username, config.password, dbSettings);
  sequelize = new Sequelize('chievechat', 'ian-odonnell', '001T6NgTomzl', dbSettings);
}

var db = {};

var models = [
  require('./game'),
  require('./persona')
];

models.forEach(model => {
  const sequelizeModel = model(sequelize, Sequelize);
  db[sequelizeModel.name] = sequelizeModel;
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
