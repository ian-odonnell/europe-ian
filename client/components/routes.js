import React from 'react';                                        // eslint-disable-line no-unused-vars
import { Switch, Redirect, Route, Link } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import EuropeMap from './europeMap';

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={EuropeMap} />
    </Switch>
  );
};
