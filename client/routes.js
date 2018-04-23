import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EuropeMap from './components/europeMap';

const renderPage = (props) => <EuropeMap {...props}/>;

export default () => (
  <Switch>
    <Route exact path='/' render={renderPage} />
    <Route path='/:location' render={renderPage} />
  </Switch>
);
