import React from 'react';
import {Link} from 'react-router-dom';

export default class Page extends React.Component {
  render() {
    return (
      <div>
        <div><img src='/images/Warning.png'/></div>
        <div>Parent</div>
        <ul>
          <li><Link to='/child/1'>One</Link></li>
          <li><Link to='/child/2'>Two</Link></li>
          <li><Link to='/child/3'>Three</Link></li>
          </ul>
      </div>
    );
  }
}
