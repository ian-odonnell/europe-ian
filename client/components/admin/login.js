import React from 'react';

class ChatPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  async componentDidMount() {
  }

  render() {
    return (
      <div className="loginPage">
        <form action='/auth/local/login' method='post'>
          <table>
            <tbody>
              <tr><td>User:</td><td><input name='username' /></td></tr>
              <tr><td>Password:</td><td><input type='password' name='password' /></td></tr>
              <tr><td colSpan={2}><button type='submit'>Log in</button></td></tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default ChatPage;
