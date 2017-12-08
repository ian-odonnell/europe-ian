/* global window document */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './client/routes';
import './client/style.css';
import configureStore from './client/store/configureStore';
import { Provider } from 'react-redux';

import jquery from "jquery";
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
  render(<AppClient />, document.getElementById('app'));
};
