import React from 'react';                                        // eslint-disable-line no-unused-vars
import { Switch, Redirect, Route, Link } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import ChatPage from './chatPage';
import Login from './admin/login';

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={ChatPage} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
};
