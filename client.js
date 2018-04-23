/* global window document */

import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './client/routes';
import configureStore from './client/store/configureStore';
import { Provider } from 'react-redux';
import jquery from "jquery";

import './client/styles/style.css';
import 'fancybox/dist/css/jquery.fancybox.css';
import 'fancybox/dist/helpers/css/jquery.fancybox-buttons.css';


global.$ = jquery;
window.$ = window.jQuery = require('jquery');


require('fancybox/dist/js/jquery.fancybox');
require('fancybox/dist/helpers/js/jquery.fancybox-buttons.js');

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
