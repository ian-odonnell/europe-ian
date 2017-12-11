import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChatPage from './components/chatPage';
import Login from './components/admin/login';

const renderPage = () => <ChatPage />;

export default () => (
  <Switch>
    <Route exact path='/' render={renderPage} />
    <Route exact path="/login" component={Login} />
  </Switch>
);
