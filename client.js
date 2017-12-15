/* global window document */

import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './client/routes';
import configureStore from './client/store/configureStore';
import { Provider } from 'react-redux';
import jquery from "jquery";

import './client/styles/style.css';
import './client/styles/chatfeed.css';
import './client/styles/header.css';

global.$ = jquery;
window.$ = window.jQuery = jquery;

const store = configureStore();

const AppClient = () => (
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>
);

window.onload = () => {
  hydrate(<AppClient />, document.getElementById('app'));
};
