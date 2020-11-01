import React, { Component } from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth() {
    this.props.history.push('/dashboard');
  }

  render() {
    const { handleLogout } = this.props; 

    return (
      <div>
        <h1>Home</h1>
        <button onClick={() => handleLogout()}>Logout</button>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    );
  }
}

export default Home;