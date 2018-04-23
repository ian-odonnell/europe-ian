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
import adminApi from './server/localApi/admin';
import auth from './server/auth';
import bcrypt from 'bcrypt-nodejs';

// Config
import config from './config';

const app = new Express();
const server = new Server(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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

// Set up API routing
app.use('/admin', adminApi);

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
    </Provider>
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
