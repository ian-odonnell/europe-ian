import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

class ChatMessageReplies extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  async componentDidMount() {
    this.setState({});
  }

  render() {
    let replyRows = [];
    for (let reply of this.props.replies) {
      replyRows.push(
        <tr key={reply.id}>
          <td className="replyPersona">{reply.persona.name}</td>
          <td className="replyBody">
          <div>{reply.body}</div>
          <br/>
          <div className="chatMessageTimestamp">{moment(reply.timestamp).format('ddd Do MMM, HH:mm')}</div>
          </td>
        </tr>
      );
    }
    return (
      <table className="chatMessageReplies">
        <tbody>
          {replyRows}
        </tbody>
      </table>
    );
  }
}

export default ChatMessageReplies;
