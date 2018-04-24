import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EuropeMap from './components/europeMap';
import ImageUpload from './components/imageUpload';

const renderPage = (props) => <EuropeMap {...props}/>;
const uploadPage = (props) => <ImageUpload {...props}/>;

export default () => (
  <Switch>
    <Route exact path='/' render={renderPage} />
    <Route exact path='/upload' render={uploadPage}/>
    <Route path='/:location' render={renderPage} />
  </Switch>
);
