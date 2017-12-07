import React from 'react';
import ReactDOM from 'react-dom';

class ChatHeader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  async componentDidMount() {
    this.setState({});
  }

  render() {
    return (
      <div className="chatHeader">
        <h2><a href='/auth/google'>Log in with Google</a></h2>
      </div>
    );
  }
}

export default ChatHeader;