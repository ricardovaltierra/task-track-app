import React, { Component } from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/index';

class Home extends Component {

  componentDidMount() {
    this.props.handleSignStatus().then(
      () => {
        if(this.props.logged_in) 
          this.props.history.push('/dashboard');
      })
  }

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

const mapStateToProps = state => ({
  logged_in: state.account.logged_in
});

const mapDispatchToProps = dispatch => ({
  handleSignStatus: () => dispatch(fetchUser('sign_status'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);