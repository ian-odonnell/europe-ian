import React from 'react';
import ReactDOM from 'react-dom';
import ChatMessagePersona from './chatMessagePersona';
import ChatMessageBody from './chatMessageBody';
import ChatMessageGame from './chatMessageGame';

class ChatMessage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  async componentDidMount() {
    this.setState({});
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

    let chatMessageBody = <ChatMessageBody message={this.props.message} colcount={colcount} />;

    let messageClass = 'chatMessage';
    if (!this.props.filters.showSteam) {
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

export default ChatMessage;
