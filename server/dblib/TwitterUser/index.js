let models = require('../../dbmodels/models');

/* eslint-disable no-extra-boolean-cast */

exports.getAllTwitterUsers = () => {
  return new Promise((resolve) => {
    var allUsers = models.twitteruser.findAll();
    resolve(allUsers);
  });
};

exports.truncate = () => {
  return models.twitteruser.destroy({
    where: {}
  });
}
