let models = require('../../dbmodels/models');

/* eslint-disable no-extra-boolean-cast */

exports.createUser = (userData, transaction) => {
    let txn = (!!transaction ? { transaction } : {});
    return models.user.create(userData, txn);
};

exports.getAllUsers = () => {
  return new Promise((resolve) => {
    var allUsers = models.user.findAll();
    resolve(allUsers);
  });
};

exports.truncate = () => {
  return models.user.destroy({
    where: {}
  });
}
