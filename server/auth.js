var express = require('express');
var passport = require('passport');
var router = express.Router();

import User from './dblib/User';
import Persona from './dblib/Persona';
import models from './dbmodels';

router.get('/', async function (req, res) {
  let lookUpUser = req.user;

  // Network currently blocking Google authorization requests, so allow environment variable to provide a default
  if (!lookUpUser && process.env.DEFAULT_LOG_IN) {
    lookUpUser = { id: (await User.getUsers())[0].id };
  }

  if (lookUpUser) {
    const loggedInUser = await User.getUsers({ id: lookUpUser.id }, [{ model: models.persona }]);
    if (loggedInUser) {
      res.json(loggedInUser[0]);
    } else {
      res.json({});
    }
  } else {
    res.json({});
  }
});

/* GET home page. */
router.route('/google/callback')
  .get(passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

router.route('/google')
  .get(passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

router.route('/twitter/callback')
  .get(passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

router.route('/twitter')
  .get(passport.authenticate('twitter'));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/local/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;
