import React from 'react';
import ReactDOM from 'react-dom';
import ChatMessageReplies from './chatMessageReplies';
import moment from 'moment';

export default (props) => {
  let replies = undefined;
  if (props.message.replies) {
    replies = <ChatMessageReplies replies={props.message.replies} />;
  }
  let body = undefined;

  if (props.message.achievement) {
    body =
      <div className="bodyAchievement">
        <div>
          <img src={props.message.achievement.iconUrl} />
        </div>
        <span className="achievementName">
          {props.message.achievement.displayName}
        </span>
        <br />
        <span className="achievementDescription">
          {props.message.achievement.description}
        </span>
        <br />
        {replies}
      </div>;
  } else {
    body =
      <div>
        <span dangerouslySetInnerHTML={{ __html: props.message.body }}></span>
        <br />
        {replies}
      </div>;
  }

  let replyLink = undefined;
  if (props.showPopup) {
    replyLink = <div className="replyLink" onClick={() => props.showPopup()} >
      <img src='/images/reply.png' />
    </div>;
  }

  return (
    <td className="chatMessageBody" colSpan={props.colcount}>
      {replyLink}
      <div>
        <div>{body}</div>
        <br />
        <div className="chatMessageTimestamp">{moment(props.message.timestamp).format('ddd Do MMM, HH:mm')}</div>
      </div>
    </td>
  );
}
