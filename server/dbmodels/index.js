"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '../../config', 'config.json'))[env];

var dbSettings = {
  host: config.host,
  dialect: 'mssql',
  dialectOptions: {encrypt: true},
  pool: {
    min: config.connectionPools.min,
    max: config.connectionPools.max,
    idle: config.connectionPools.idle
  },
  logging: true
};

var sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, dbSettings);
} else {
  // var sequelize = new Sequelize(config.database, config.username, config.password, config);
  // var sequelize = new Sequelize('one-goal', 'sa', '106Points', { host: 'localhost', dialect: 'mysql', pool: { max: 5, min: 0, idle: 10000 } });
  sequelize = new Sequelize(config.database, config.username, config.password, dbSettings);
}
var db = {};

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js") && (file.endsWith(".js"));
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
