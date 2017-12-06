import express from 'express';
import Sequelize from 'sequelize';
import models from './dbmodels';

const router = express.Router();

router.get('/version', (req, res) => {
  res.json({ ver: 1.1 });
});

router.get('/game', async (req, res) => {
  try {
    const result = await models.persona.findAll();
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
