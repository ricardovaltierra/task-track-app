import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/index';

const Dashboard = props => {
  const { 
    handleLogout,
    user
  } = props; 

  console.log('props', props)

  return (
    <div className='dashboard'>
      <div className='title'>
        <h1>Dashboard</h1>
        <h2>user: {user.email || 'NOT_LOGGED_IN'}</h2>
      </div>

      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.account.user
});

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(fetchUser('sign_out'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);