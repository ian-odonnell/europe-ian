import React from 'react';
import ReactDOM from 'react-dom';
import ChatMessagePersona from './chatMessagePersona';
import ChatMessageBody from './chatMessageBody';
import ChatMessageGame from './chatMessageGame';
import { connect } from 'react-redux';
import * as chatActions from '../../actions/chatActions';

class ChatMessage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let chatMessagePersona = undefined;
    if (this.props.message.personaRows) {
      chatMessagePersona = <ChatMessagePersona persona={this.props.message.persona} rowcount={this.props.message.personaRows} />;
    }

    let chatMessageGame = undefined;
    if (this.props.message.achievement && this.props.message.gameRows) {
      chatMessageGame = <ChatMessageGame game={this.props.message.achievement.game} rowcount={this.props.message.gameRows} />;
    }

    let colcount = 1;
    if (!this.props.message.achievement) {
      colcount = 2;
    }

    let chatMessageBody = <ChatMessageBody message={this.props.message} colcount={colcount} showPopup={this.props.showPopup} />;

    let messageClass = 'chatMessage';
    if (!this.props.visible) {
      messageClass = 'chatMessageHidden';
    }

    return (
      <tr className={messageClass}>
        {chatMessagePersona}
        {chatMessageGame}
        {chatMessageBody}
      </tr>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let visible = true;
  if (!state.filters.showSteam && ownProps.message.achievement && ownProps.message.achievement.game.steamId) {
    visible = false;
  }

  return {
    visible
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    showPopup: () => dispatch(chatActions.showPopup(ownProps.message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessage);
