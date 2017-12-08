import React from 'react';
import ReactDOM from 'react-dom';
import ChatHeader from './header/chatHeader';
import ChatFeed from './feed/chatFeed';

class ChatPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  async componentDidMount() {
    this.setState({});
  }

  render() {
    return (
      <div className="chatPage">
        <ChatHeader />
        <ChatFeed />
      </div>
    );
  }
}

export default ChatPage;
