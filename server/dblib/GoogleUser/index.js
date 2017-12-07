let models = require('../../dbmodels/models');

/* eslint-disable no-extra-boolean-cast */

exports.createGoogleUser = (googleUserData, transaction) => {
  let txn = (!!transaction ? { transaction } : {});
  return models.googleuser.create(googleUserData, txn);
};

exports.getGoogleUsers = (where) => {
  return new Promise((resolve) => {
    var allUsers = models.googleuser.findAll({where});
    resolve(allUsers);
  });
};

exports.truncate = () => {
  return models.googleuser.destroy({
    where: {}
  });
}
