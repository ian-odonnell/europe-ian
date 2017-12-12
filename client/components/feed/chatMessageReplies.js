import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

export default (props) => {
  let replyRows = [];

  for (let reply of props.replies) {
    replyRows.push(
      <tr key={reply.id}>
        <td className="replyPersona">{reply.persona.name}</td>
        <td className="replyBody">
          <div>{reply.body}</div>
          <br />
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
