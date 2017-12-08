import React from 'react';
import ReactDOM from 'react-dom';
import ChatHeader from './header/chatHeader';
import ChatFeed from './feed/chatFeed';
import { connect } from 'react-redux';
import * as chatActions from '../actions/chatActions';
import PostDialog from './postDialog';

class ChatPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  async componentDidMount() {
    this.setState({});
  }

  render() {
    const popup = this.props.message.showPopup ? <PostDialog hidePopup={this.props.hidePopup} postMessage={this.props.postMessage} /> : undefined;

    return (
      <div className="chatPage">
        {popup}
        <ChatHeader />
        <ChatFeed />
        <button onClick={this.props.showPopup}>Post Message</button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    message: state.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showPopup: () => dispatch(chatActions.showPopup()),
    hidePopup: () => dispatch(chatActions.hidePopup()),
    postMessage: (messageBody, parentMessageId) => dispatch(chatActions.postMessage(messageBody, parentMessageId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
