import express from 'express';
import models from '../dbmodels/models';
import rp from 'request-promise';

const router = express.Router();

// TODO: Christ, this is insecure.  And on a GET, as well?  Remove it when I have an actual deployment process!
router.get('/initdb', async function (req, res, next) {
  await models.sequelize.sync({ force: true });
  res.json({ done: "Done" });
});

router.get('/version', function (req, res) {
  res.json({ ver: "1.0" });
})

router.get('/steam/*', async function (req, res) {
  const steamUrl = 'http://api.steampowered.com/' + req.originalUrl.replace('/steam/', '');

  var options = {
    uri: steamUrl,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  }
  res.json(await rp(options));
});

export default router;
