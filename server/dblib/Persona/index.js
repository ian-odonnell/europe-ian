let models = require('../../dbmodels/models');

/* eslint-disable no-extra-boolean-cast */


exports.createPersona = (personaData, transaction) => {
    let txn = (!!transaction ? { transaction } : {});
    return models.persona.create(personaData, txn);
};

exports.getAllPersonas = () => {
  return new Promise((resolve) => {
    var allPersonas = models.persona.findAll();
    resolve(allPersonas);
  });
};

exports.truncate = () => {
  return models.persona.destroy({
    where: {}
  });
}
