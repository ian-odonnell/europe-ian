import express from 'express';
import Sequelize from 'sequelize';
import gameModel from './dbmodels/game';

const router = express.Router();

router.get('/version', (req, res) => {
  res.json({ ver: 1.1 });
});

router.get('/game', async (req, res) => {
  try {
  const dbSettings = {
    host: 'ian-odonnell.database.windows.net', //config.host,
    dialect: 'mssql',
    dialectOptions: {encrypt: true},
    pool: {
      min: 0, //config.connectionPools.min,
      max: 5, //config.connectionPools.max,
      idle: 10000 //config.connectionPools.idle
    },
    logging: true
  };
  const sequelize = new Sequelize('chievechat', 'ian-odonnell', '001T6NgTomzl', dbSettings);

  var GM = gameModel(sequelize, Sequelize);

  const result = await GM.findAll();
  // const result = await sequelize.query("select * from games", {model: GM});

  res.json(result);
} catch(err){
  console.log(err);
}

});

router.use((req, res, next) => {
  res.status(404).send('Not found');
});

export default router;
