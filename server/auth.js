var express = require('express');
var passport = require('passport');
var router = express.Router();

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
