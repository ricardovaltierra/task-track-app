import React, { Component } from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';

class Home extends Component {

  render() {
    return (
      <div className='home'>
        <div className='title'><h1>Tasktracker</h1></div>
        <Registration homeProps={this.props} />
        <Login homeProps={this.props} />
      </div>
    );
  }
}

export default Home;