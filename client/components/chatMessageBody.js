import React from 'react';
import ReactDOM from 'react-dom';
import ChatMessageReplies from './chatMessageReplies';
import moment from 'moment';

class ChatMessageBody extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  async componentDidMount() {
    this.setState({});
  }

  render() {
    let replies = undefined;
    if (this.props.message.replies) {
      replies = <ChatMessageReplies replies={this.props.message.replies} />;
    }
    let body = undefined;

    if (this.props.message.achievement) {
      body =
        <div className="bodyAchievement">
          <div>
            <img src={this.props.message.achievement.iconUrl} />
          </div>
          <span className="achievementName">
            {this.props.message.achievement.displayName}
          </span>
          <br />
          <span className="achievementDescription">
            {this.props.message.achievement.description}
          </span>
          <br />
          {replies}
        </div>;
    } else {
      body =
        <div>
          <span dangerouslySetInnerHTML={{__html: this.props.message.body}}></span>
          <br />
          {replies}
        </div>;
    }

    return (
      <td className="chatMessageBody" colSpan={this.props.colcount}>
        <div>{body}</div>
        <br/>
        <div className="chatMessageTimestamp">{moment(this.props.message.timestamp).format('ddd Do MMM, HH:mm')}</div>
      </td>
    );
  }
}

export default ChatMessageBody;
