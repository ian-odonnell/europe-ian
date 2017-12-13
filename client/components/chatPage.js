import React from 'react';
import ReactDOM from 'react-dom';
import ChieveChatApi from '../api/chieveChatApi';
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
    var auth = await ChieveChatApi.getAuth();
    if (auth && auth.personas) {
      this.props.switchUser(auth);
    } else {
      this.props.switchUser(undefined);
    }
  }

  render() {
    const popup = this.props.message.showPopup ? <PostDialog replyToMessage={this.props.message.replyToMessage} hidePopup={this.props.hidePopup} postMessage={this.props.postMessage} persona={this.props.user.activePersona} /> : undefined;

    return (
      <div className="chatPage">
        {popup}
        <ChatHeader />
        <ChatFeed />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    message: state.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showPopup: () => dispatch(chatActions.showPopup()),
    hidePopup: () => dispatch(chatActions.hidePopup()),
    postMessage: (persona, messageBody, parentMessageId) => dispatch(chatActions.postMessage(persona, messageBody, parentMessageId)),
    switchUser: (newUser) => dispatch(chatActions.switchUser(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
