import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/index';

const Dashboard = props => {
  const { 
    handleLogout,
    user
  } = props; 

  console.log('Dashboard props>user', user);

  return (
    <div className='dashboard'>
      <div className='title'>
        <h1>Dashboard</h1>
        <h2>user: { user.email }</h2>
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