import React from 'react';
import { node } from 'prop-types';

const Dashboard = props => {
  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Status: {props.loggedInStatus}</h1>
      <h1>Current user: {props.user.email}</h1>
    </div>
  );
};

export default Dashboard;