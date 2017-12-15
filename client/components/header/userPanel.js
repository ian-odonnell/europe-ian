import React from 'react';

class UserPanel extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let googleUrl = '/auth/google';
    let twitterUrl = '/auth/twitter';
    let steamUrl = '/auth/steam';
    let loginMessage = 'Log in with:';
    let dropdownMessage = 'Log in';
    let dropdownIcon = undefined;
    let logoutOption = undefined;

    if (this.props.selectedPersona) {
      logoutOption = <div><a href='/auth/logout'>Log out</a></div>;
      dropdownMessage = this.props.selectedPersona.name;
      dropdownIcon = <div className='miniAvatar'><img src={this.props.selectedPersona.avatarUrl} /></div>;
      loginMessage = 'Connect to:';
      googleUrl = '/auth/connect/google';
      twitterUrl = '/auth/connect/twitter';
      steamUrl = '/auth/connect/steam';
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
      <div className='loginPanel'>
        <div>{loginMessage}</div>
        <div><a href={googleUrl}><img src='/images/Google.jpg' /></a></div>
        <div><a href={twitterUrl}><img src='/images/Twitter.png' /></a></div>
        <div><a href={steamUrl}><img src='/images/Steam.png' /></a></div>
      </div>;

    return (
      <div className='dropdown'>
        <div className='dropdownHeader' onClick={() => { document.getElementById('userDropdown').classList.toggle('visiblePanel'); }}>
          {dropdownIcon}
          <div><span>{dropdownMessage}</span></div>
          <div className='downArrow'><img src='/images/DownArrow.png'/></div>
        </div>
        <div id='userDropdown' className='dropdownContent'>
          {personaSelector}
          {loginPanel}
          {logoutOption}
        </div>
      </div>
    );
  }
}

export default UserPanel;
