import React from 'react';
import ReactDOM from 'react-dom';
import ChieveChatApi from '../api/chieveChatApi';

class ChatHeader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { selectedPersona: undefined };
  }

  async componentDidMount() {
    var auth = await ChieveChatApi.getAuth();
    if (auth && auth.personas) {
      this.setState({
        selectedPersona: auth.personas[0]
      })
    }
    else {
      this.setState({
        selectedPersona: undefined
      });
    }
  }

  render() {
    let persona = undefined;
    let login = undefined;
    if (this.state.selectedPersona) {
      persona = (
        <div className="headerPersona">
          <img src={this.state.selectedPersona.avatarUrl} />
        </div>
      );
    } else {
    }
    login = <div className="headerLogin"><a href='/auth/google'>Log in with Google</a></div>;
    return (
      <div className="chatHeader">
        {login}
        {persona}
      </div>
    );
  }
}

export default ChatHeader;
