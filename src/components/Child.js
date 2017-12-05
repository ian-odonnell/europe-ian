import React from 'react';

export default class Child extends React.Component {
  render() {
    console.log(this.props.match.params.childId);

    return (
      <div>Child {this.props.match.params.childId}</div>
    );
  }
}
