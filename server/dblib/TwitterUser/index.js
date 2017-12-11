let models = require('../../dbmodels');

/* eslint-disable no-extra-boolean-cast */

exports.createTwitterUser = (twitterUserData, transaction) => {
  let txn = (!!transaction ? { transaction } : {});
  return models.twitteruser.create(twitterUserData, txn);
};

exports.getTwitterUsers = (where) => {
  return new Promise((resolve) => {
    var allUsers = models.twitteruser.findAll({where});
    resolve(allUsers);
  });
};

exports.truncate = () => {
  return models.twitteruser.destroy({
    where: {}
  });
}
