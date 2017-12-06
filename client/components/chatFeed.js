import React from 'react';
import ReactDOM from 'react-dom';
import ChieveChatApi from '../api/chieveChatApi';
import ChatMessage from './chatMessage';

class ChatFeed extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { chat: [] };
  }

  componentDidMount() {
    this.loadChat();
  }

  async loadChat() {
    const latestChat = await ChieveChatApi.getChat();
    this.calculateChatGroups(latestChat);
    this.setState({ chat: latestChat });
    setTimeout(this.loadChat.bind(this), 5000);
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

    // Determine the groups
    for (const message of this.state.chat) {
      chatRows.push(
        <ChatMessage key={message.id} message={message} />
      );
    }

    return (
      <div className="chatFeed">
        <table>
          <tbody>
            {chatRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ChatFeed;
