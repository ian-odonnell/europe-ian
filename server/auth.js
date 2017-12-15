var express = require('express');
var passport = require('passport');
var router = express.Router();

import User from './dblib/User';
import models from './dbmodels';

router.get('/', async function (req, res) {
  let lookUpUser = req.user;

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

router.route('/connect/google')
  .get(passport.authorize('google', {
    scope: ['profile', 'email']
  }));

  router.route('/twitter/callback')
  .get(passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

router.route('/twitter')
  .get(passport.authenticate('twitter'));

router.route('/connect/twitter')
  .get(passport.authorize('twitter'));

  router.route('/steam/callback')
  .get(passport.authenticate('steam', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

router.route('/steam')
  .get(passport.authenticate('steam'));

router.route('/connect/steam')
  .get(passport.authorize('steam'));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/local/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login'
}));


module.exports = router;
