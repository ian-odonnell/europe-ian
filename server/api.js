import express from 'express';

const router = express.Router();

router.get('/version', (req, res) => {
  res.json({ ver: 1.1 });
});

router.use((req, res, next) => {
  res.status(404).send('Not found');
});

export default router;
