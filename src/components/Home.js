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
    return (
      <div className='home'>
        <div className='title'><h1>Tasktracker</h1></div>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    );
  }
}

export default Home;