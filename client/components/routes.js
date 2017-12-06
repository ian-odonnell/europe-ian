import React from 'react';                                        // eslint-disable-line no-unused-vars
import { Switch, Redirect, Route, Link } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import ChatPage from './chatPage';

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={ChatPage} />
    </Switch>
  );
};
