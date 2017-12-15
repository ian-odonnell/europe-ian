import express from 'express';
import models from '../dbmodels';
import rp from 'request-promise';

const router = express.Router();

// TODO: Christ, this is insecure.  And on a GET, as well?  Remove it when I have an actual deployment process!
router.get('/initdb', async function (req, res) {
  await models.sequelize.sync({ force: false });
  res.json({ done: "Done" });
});

router.get('/version', function (req, res) {
  res.json({ ver: "1.0" });
})

router.get('/steam/*', async function (req, res) {
  try {
    const steamUrl = 'http://api.steampowered.com/' + req.originalUrl.replace('/admin/steam/', '');
    var options = {
      uri: steamUrl,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    }
    res.json(await rp(options));
  }
  catch (err) {
    res.status(500);
    res.send('Something went wrong: ' + err);
  }
});

export default router;
