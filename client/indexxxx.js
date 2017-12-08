import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app'));
};
