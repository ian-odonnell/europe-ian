import models from '../../dbmodels';

/* eslint-disable no-extra-boolean-cast */

exports.createPhoto = (photoData, transaction) => {
  let txn = (!!transaction ? { transaction } : {});
  return models.photo.create(photoData, txn);
};

exports.getPhotosForLocation = (locationId) => {
  return new Promise((resolve) => {
    var selectedPhotos = models.photo.findAll({where:{locationId}});
    resolve(selectedPhotos);
  });
};

exports.truncate = () => {
  return models.photo.destroy({
    where: {}
  });
}
