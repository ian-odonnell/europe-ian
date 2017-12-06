import React from 'react';
import ReactDOM from 'react-dom';

class ChatMessagePersona extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  async componentDidMount() {
    this.setState({});
  }

  render() {
    return (
      <td className="chatMessagePersona" rowSpan={this.props.rowcount}>
        <div className="personaName">
          <a href={this.props.persona.profileUrl}>{this.props.persona.name}</a></div>
        <div className="personaAvatar"><img src={this.props.persona.avatarUrl} /></div>
      </td>
    );
  }
}

export default ChatMessagePersona;
