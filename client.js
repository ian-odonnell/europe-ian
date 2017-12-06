/* global window document */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './client/routes';

const AppClient = () => (
  <Router>
    <Routes />
  </Router>
);

window.onload = () => {
  render(<AppClient />, document.getElementById('app'));
};
