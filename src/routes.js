import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Page from './components/Page';
import Child from './components/Child';

export default () => {
  return (
    <Switch>
      <Route exact path='/' component={Page} />
      <Route path='/child/:childId' component={Child} />
    </Switch>
  );
};
