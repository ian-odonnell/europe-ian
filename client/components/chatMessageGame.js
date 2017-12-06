import React from 'react';
import ReactDOM from 'react-dom';

class ChatMessageGame extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  async componentDidMount() {
    this.setState({});
  }

  render() {
    return (
      <td className="chatMessageGame" rowSpan={this.props.rowcount}>
        <img src={this.props.game.logoUrl} />
      </td>
    );
  }
}

export default ChatMessageGame;
