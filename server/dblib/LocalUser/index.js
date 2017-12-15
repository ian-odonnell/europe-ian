import models from '../../dbmodels';

/* eslint-disable no-extra-boolean-cast */

exports.createLocalUser = (localUserData, transaction) => {
  let txn = (!!transaction ? { transaction } : {});
  return models.localuser.create(localUserData, txn);
};

exports.getLocalUsers = (where) => {
  return new Promise((resolve) => {
    var allUsers = models.localuser.findAll({where});
    resolve(allUsers);
  });
};

exports.truncate = () => {
  return models.localuser.destroy({
    where: {}
  });
}
