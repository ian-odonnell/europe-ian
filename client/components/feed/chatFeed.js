import React from 'react';
import ReactDOM from 'react-dom';
import ChieveChatApi from '../../api/chieveChatApi';
import ChatMessage from './chatMessage';
import { connect } from 'react-redux';
import * as chatActions from '../../actions/chatActions';

class ChatFeed extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }


  calculateChatGroups(chatArray) {
    const lastIndex = chatArray.length - 1;
    chatArray[lastIndex].personaRows = 1;
    chatArray[lastIndex].gameRows = 1;

    for (let i = lastIndex - 1; i >= 0; --i) {
      if (chatArray[i].persona.id === chatArray[i + 1].persona.id) {
        chatArray[i].personaRows = chatArray[i + 1].personaRows + 1;
        chatArray[i + 1].personaRows = undefined;
      }
      else {
        chatArray[i].personaRows = 1;
      }

      if (chatArray[i].persona.id === chatArray[i + 1].persona.id && chatArray[i].achievement && chatArray[i + 1].achievement && chatArray[i].achievement.game.id === chatArray[i + 1].achievement.game.id) {
        chatArray[i].gameRows = chatArray[i + 1].gameRows + 1;
        chatArray[i + 1].gameRows = undefined;
      }
      else {
        chatArray[i].gameRows = 1;
      }
    }
  }

  render() {
    let chatRows = [];

    for (const message of this.props.chat.chatMessages) {
      chatRows.push(
        <ChatMessage key={message.id} message={message} />
      );
    }

    const result = (
      <div className="chatFeed">
        <table className="chatTable">
          <colgroup>
            <col className="personaColumn" />
            <col className="gameColumn" />
            <col className="messageColumn" />
          </colgroup>
          <tbody>
            {chatRows}
          </tbody>
        </table>
      </div>
    );
    return result;
  }
}

function mapStateToProps(state, ownProps) {
  let loggedIn = false;
  if (state.user.activePersona) {
    loggedIn = true;
  }

  return {
    chat: state.chat,
    loggedIn
  };
}

export default connect(mapStateToProps)(ChatFeed);
