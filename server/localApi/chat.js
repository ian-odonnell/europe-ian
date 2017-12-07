import express from 'express';
import Sequelize from 'sequelize';
import models from '../dbmodels/models';

const router = express.Router();

router.get('/version', (req, res) => {
  res.json({ ver: 1.1 });
});

router.get('/game', async (req, res) => {
  try {
    const result = await models.achievementView.findAll();

    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

router.get('/latest', async function (req, res, next) {
  try {
    let response = {};

    response = await models.message.findAll({
      where: { parentMessageId: null },
      order: [
        ['timestamp', 'DESC'],
        [{ model: models.message, as: 'replies' }, 'timestamp', 'ASC']
      ],
      limit: 50,
      include: [
        {
          model: models.persona
        },
        {
          model: models.achievement,
          include: [
            {
              model: models.game
            }
          ]
        },
        {
          model: models.message,
          as: 'replies',
          order: [['timestamp', 'DESC']],
          include: [
            {
              model: models.persona
            }
          ]
        }
      ]
    });

    res.json(response);
  }
  catch (err) {
    res.status(500).send(JSON.stringify(err));
  }
});

router.use((req, res, next) => {
  res.status(404).send('Not found');
});

export default router;
