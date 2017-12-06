/* global window document */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './client/routes';
import './client/style.css';

import jquery from "jquery";
global.$ = jquery;
window.$ = window.jQuery = jquery;

const AppClient = () => (
  <Router>
    <Routes />
  </Router>
);

window.onload = () => {
  render(<AppClient />, document.getElementById('app'));
};
