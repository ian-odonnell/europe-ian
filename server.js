// 3rd party
import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';

// Client
import Routes from './client/routes';
import configureStore from './client/store/configureStore';
import { Provider } from 'react-redux';

// Server
import chatApi from './server/localApi/chat';
import adminApi from './server/localApi/admin';
import updateApi from './server/localApi/update';
import auth from './server/auth';
import LocalUser from './server/dblib/LocalUser';
import GoogleUser from './server/dblib/GoogleUser';
import TwitterUser from './server/dblib/TwitterUser';
import Persona from './server/dblib/Persona';
import User from './server/dblib/User';

// Config
import config from './config';

const app = new Express();
const server = new Server(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const LocalStrategy = require('passport-local').Strategy;
passport.use('local-login', new LocalStrategy({
  passReqToCallback: true
},
  async function (req, username, password, done) {
    let existingUser = await LocalUser.getLocalUsers({ username });
    if(existingUser.length == 0) {
      return done(null, false);
    }

    if(existingUser[0].password !== password) {
      return done(null, false);
    }

    console.log(existingUser[0]);
    let existingPersona = await existingUser[0].getPersona();
    console.log(existingPersona);
    let existingParent = await existingPersona.getUser();
    console.log(existingParent);
    return done(null, existingParent);
}));

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
  new GoogleStrategy({
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: config.googleCallbackUrl
  },
    async function (req, accessToken, refreshToken, profile, done) {
      let existingUser = await GoogleUser.getGoogleUsers({ googleId: profile.id });
      if (existingUser.length == 0) {
        // If we're not logged in already (e.g. with a Steam user) then create a new "parent" user
        let parentUser = req.user;
        if (!parentUser) {
          parentUser = await User.createUser({});
        }

        // Create a new persona for the new Google user
        let googlePersona = await Persona.createPersona({
          name: profile.displayName,
          avatarUrl: profile._json.image.url,
          userId: parentUser.id
        });

        // Create the new Google user
        let googleUser = await GoogleUser.createGoogleUser({ googleId: profile.id, personaId: googlePersona.id });
        return done(null, parentUser);
      } else {
        let existingPersona = await existingUser[0].getPersona();
        let existingParent = await existingPersona.getUser();
        return done(null, existingParent);
      }
    })
);

const TwitterStrategy = require('passport-twitter').Strategy;
passport.use(
  new TwitterStrategy({
    consumerKey: config.twitterConsumerKey,
    consumerSecret: config.twiterConsumerSecret,
    callbackURL: config.twitterCallbackUrl
  },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      let existingUser = await TwitterUser.getTwitterUsers({ twitterId: profile.id });
      if (existingUser.length == 0) {
        // If we're not logged in already (e.g. with a Steam user) then create a new "parent" user
        let parentUser = undefined; // req.user;
        if (!parentUser) {
          parentUser = await User.createUser({});
        }

        // Create a new persona for the new Twitter user
        let twitterPersona = await Persona.createPersona({
          name: profile._json.screen_name,
          avatarUrl: profile._json.profile_image_url.replace('_normal.', '.'),
          userId: parentUser.id
        });

        // Create the new Twitter user
        let twitterUser = await TwitterUser.createTwitterUser({ twitterId: profile.id, personaId: twitterPersona.id });
        return done(null, parentUser);
      } else {
        let existingPersona = await existingUser[0].getPersona();
        let existingParent = await existingPersona.getUser();
        return done(null, existingParent);
      }
    }));

// Use ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './client/views'));

// Define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, './client/static')));

// Set up session handling and authentication
let MSSQLStore = require('connect-mssql')(session);
let sqlConfig = {
  user: config.databaseUser,
  password: config.databasePassword,
  server: config.databaseHost,
  database: config.databaseName,
  options: {
    encrypt: true
  }
};
app.use(session({ store: new MSSQLStore(sqlConfig, { ttl: 1000 * 60 * 24 * 30 }), secret: 'secretkey', cookie: { maxAge: (1000 * 60 * 24 * 30) } }));

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

  const store = configureStore();
  const context = {};
  markup = renderToString(
    <Provider store={store}>
      <Router location={req.url} context={context}>
        <Routes />
      </Router>
    </Provider>,
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
