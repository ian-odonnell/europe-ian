import React from 'react';
import ReactDOM from 'react-dom';

class UserPanel extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let persona = undefined;
    let login = undefined;
    if (this.props.selectedPersona) {
      persona = (
        <div className="headerPersona">
          <img src={this.props.selectedPersona.avatarUrl} />
        </div>
      );
    } else {
    }
    login = <div className="headerLogin"><a href='/auth/google'><img src='/images/Google.jpg' /></a></div>;
    return (
      <div className="userPanel">
        {login}
        {persona}
      </div>
    );
  }
}

export default UserPanel;
