import React from 'react';
import ReactDOM from 'react-dom';
import ChatHeader from './header/chatHeader';
import ChatFeed from './feed/chatFeed';

class PostDialog extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  async componentDidMount() {
    this.setState({});
  }

  render() {
    let parentMessageId = undefined;
    if(this.props.replyToMessage) {
      parentMessageId = this.props.replyToMessage.id;
    }

    return (
      <div className="postDialogWrapper" onClick={this.props.hidePopup}>
        <div className="postDialog" onClick={(e) => {e.stopPropagation();}}>
          <textarea autoFocus ref="messageBody" />
          <button onClick={() => this.props.postMessage(this.props.persona, ReactDOM.findDOMNode(this.refs.messageBody).value, parentMessageId)}>Submit</button>
        </div>
      </div>
    );
  }
}

export default PostDialog;
