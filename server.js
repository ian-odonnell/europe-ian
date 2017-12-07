// 3rd party
import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import passport from 'passport';
import session from 'express-session';

// Client
import Routes from './client/routes';

// Server
import chatApi from './server/localApi/chat';
import adminApi from './server/localApi/admin';
import updateApi from './server/localApi/update';
import auth from './server/auth';

// Config
import config from './config';

const app = new Express();
const server = new Server(app);

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
  new GoogleStrategy({
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: config.googleCallbackUrl
  },
  function (req, accessToken, refreshToken, profile, done) {
    console.log("Callback in server.js: " + JSON.stringify(profile));
    done(null, profile);
  })
);

// Use ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './client/views'));

// Define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, './client/static')));

// Set up session handling and authentication
app.use(session({ secret: 'secretkey' }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Set up API routing
app.use('/api', chatApi);
app.use('/admin', adminApi);
app.use('/update', updateApi);
app.use('/auth', auth);

// universal routing and rendering
app.get('*', (req, res) => {
  let markup = '';
  let status = 200;

  console.log("app.get(*) - " + req);

  const context = {};
  markup = renderToString(
    <Router location={req.url} context={context}>
      <Routes />
    </Router>,
  );

  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    return res.redirect(302, context.url);
  }

  if (context.is404) {
    console.log("404");
    status = 404;
  }

  return res.status(status).render('index', { markup });
});

// Start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.info(
    `
      Server running on http://localhost:${port} [${env}]
    `);
});
