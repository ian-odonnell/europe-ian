import models from '../../dbmodels';

/* eslint-disable no-extra-boolean-cast */

exports.createMessage = (messageData, transaction) => {
    let txn = (!!transaction ? { transaction } : {});
    return models.message.create(messageData, txn);
};

exports.getAllRootMessages = () => {
  return new Promise((resolve) => {
    var allMessages = models.message.findAll({ where: { parentMessageId: null }, include: [{ model: models.message, as: 'replies' }] });
    resolve(allMessages);
  });
};

exports.truncate = () => {
  return models.message.destroy({
    where: {}
  });
}
