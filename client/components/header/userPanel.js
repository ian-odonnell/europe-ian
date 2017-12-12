import React from 'react';
import ReactDOM from 'react-dom';

class UserPanel extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let persona = undefined;
    let login = undefined;
    let googleUrl = '/auth/google';
    let twitterUrl = '/auth/twitter';
    let loginMessage = 'Log in with:';

    if (this.props.selectedPersona) {
      loginMessage = 'Connect to:';
      persona = (
        <div className="headerPersona">
          <a href='/auth/logout'><img src={this.props.selectedPersona.avatarUrl} /></a>
        </div>
      );
      googleUrl = '/auth/connect/google';
      twitterUrl = '/auth/connect/twitter';
    } else {
    }
    login =
      <div className="headerLogin">
        <table>
          <tbody>
            <tr><td colspan={2}>{loginMessage}</td></tr>
            <tr>
              <td><a href={googleUrl}><img src='/images/Google.jpg' /></a></td>
              <td><a href={twitterUrl}><img src='/images/Twitter.png' /></a></td>
            </tr>
          </tbody>
        </table>
      </div>;
    return (
      <div className="userPanel">
        {login}
        {persona}
      </div>
    );
  }
}

export default UserPanel;
