var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function (req, res) {
  res.json({ user: req.user });
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

module.exports = router;
