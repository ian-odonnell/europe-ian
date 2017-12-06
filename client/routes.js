import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChatPage from './components/chatPage';

const renderPage = () => <ChatPage />;

export default () => (
  <Switch>
    <Route exact path='/' render={renderPage} />
  </Switch>
);
