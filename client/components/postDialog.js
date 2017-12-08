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
    return (
      <div className="postDialogWrapper" onClick={this.props.hidePopup}>
        <div className="postDialog" onClick={(e) => {e.stopPropagation();}}>
          <textarea ref="messageBody" />
          <button onClick={() => this.props.postMessage(this.props.persona, ReactDOM.findDOMNode(this.refs.messageBody).value, undefined)}>Submit</button>
        </div>
      </div>
    );
  }
}

export default PostDialog;
