import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/index';

const Dashboard = props => {
  const { handleLogout } = props; 
  return (
    <div className='dashboard'>
      <div className='title'><h1>Dashboard</h1></div>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(fetchUser('sign_out'))
});

export default connect(null, mapDispatchToProps)(Dashboard);