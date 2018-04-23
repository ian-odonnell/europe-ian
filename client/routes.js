import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EuropeMap from './components/europeMap';

const renderPage = () => <EuropeMap />;

export default () => (
  <Switch>
    <Route exact path='/' render={renderPage} />
  </Switch>
);
