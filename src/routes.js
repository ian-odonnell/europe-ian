import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Page from './components/Page';
import Child from './components/Child';

const renderPage = () => <Page />;

const renderChild = (match, staticContext) => {
  const id = match.match.params.childId;
  return <Child childId={id} />;
}

export default () => (
  <Switch>
    <Route exact path='/' render={renderPage} />
    <Route exact path='/child/:childId' render={renderChild} />
  </Switch>
);
