import express from 'express';
import Sequelize from 'sequelize';

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
  const result = await sequelize.query("select * from games");

  res.json({ name: result[0][0].name });
} catch(err){
  console.log(err);
}

});

router.use((req, res, next) => {
  res.status(404).send('Not found');
});

export default router;
