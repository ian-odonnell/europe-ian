import express from 'express';
import models from './dbmodels';

const router = express.Router();

router.get('/version', (req, res) => {
  res.json({ ver: 1.1 });
});

router.get('/game', (req, res) => {
  res.json({name: 'Some game'});
});

router.use((req, res, next) => {
  res.status(404).send('Not found');
});

export default router;
