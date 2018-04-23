import models from '../../dbmodels';

/* eslint-disable no-extra-boolean-cast */

exports.getAllLocations = () => {
  return new Promise((resolve) => {
    var allLocations = models.location.findAll();
    resolve(allLocations);
  });
};

exports.truncate = () => {
  return models.location.destroy({
    where: {}
  });
}
