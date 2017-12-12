import React from 'react';
import ReactDOM from 'react-dom';

class UserPanel extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let googleUrl = '/auth/google';
    let twitterUrl = '/auth/twitter';
    let loginMessage = 'Log in with:';
    let dropdownMessage = 'Log in';
    let dropdownIcon = undefined;
    let logoutOption = undefined;

    if (this.props.selectedPersona) {
      logoutOption = <div><a href='/auth/logout'>Log out</a></div>;
      dropdownMessage = this.props.selectedPersona.name;
      dropdownIcon = <div><img src={this.props.selectedPersona.avatarUrl} /></div>;
      loginMessage = 'Connect to:';
      googleUrl = '/auth/connect/google';
      twitterUrl = '/auth/connect/twitter';
    }

    let personaSelector = undefined;
    if (this.props.multiplePersonas) {
      personaSelector =
        <table className='personaSelector'>
          <tbody>
            <tr>
              <td className='personaSelectorName' colSpan={3}>{this.props.selectedPersona.name}</td>
            </tr>
            <tr>
              <td className='personaSelectorArrow'><img src='/images/LeftArrow.png' onClick={this.props.previousPersona} /></td>
              <td className='personaSelectorAvatar'><img src={this.props.selectedPersona.avatarUrl} /></td>
              <td className='personaSelectorArrow'><img src='/images/RightArrow.png' onClick={this.props.nextPersona} /></td>
            </tr>
          </tbody>
        </table>;
    }

    const loginPanel =
      <div className="loginPanel">
        <div>{loginMessage}</div>
        <div><a href={googleUrl}><img src='/images/Google.jpg' /></a></div>
        <div><a href={twitterUrl}><img src='/images/Twitter.png' /></a></div>
      </div>;

    return (
      <div className="dropdown">
        <div className="dropdownHeader" onClick={() => { document.getElementById('userDropdown').classList.toggle('visiblePanel'); }}>
          {dropdownIcon}
          <div><span>{dropdownMessage}</span></div>
          <div><img src='/images/DownArrow.png' /></div>
        </div>
        <div id="userDropdown" className="dropdownContent">
          {personaSelector}
          {loginPanel}
          {logoutOption}
        </div>
      </div>
    );

    /*
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
    );*/
  }
}

export default UserPanel;
