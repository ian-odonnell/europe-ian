import React from 'react';

export default class Child extends React.Component {
  render() {
    console.log("Render child - " + this.props.childId);

    return (
      <div>Child {this.props.childId}</div>
    );
  }
}
