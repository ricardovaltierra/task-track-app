import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/account';
import { fetchTasks } from '../actions/task';
import { fetchRecords }  from '../actions/record';

const Profile = ({ 
  handleDeleteUser, 
  handleFetchTasks,
  handleFetchRecords,
  appState }) => {

  useEffect(() => {
    handleFetchTasks();
    handleFetchRecords();
  }, [handleFetchTasks, handleFetchRecords]);

  const { account, tasks, records } = appState;
  const { user } = account;

  const renderProfile = () => {
    if (account.loading || tasks.loading || records.loading) 
      return <div>Loading...</div>;
    if (account.errors.length > 0 || records.errors.length > 0 || tasks.errors.length > 1) 
      return <div>Unable to load profile, try again please</div>;

    let completed = 0;

    const formatedDate = user.created_at.split('T');
    

    for (let i = 0; i < tasks.items.length; i += 1) {
      if (tasks.items[i].completion === 100)
        completed += 1;
    }

    if (user && tasks && records)
    return (
      <div className='user-profile'>
        <h1 className='username'>mail: {user.email}</h1>
        <h2 className='created_at'>Created date: {formatedDate[0]}</h2>
        <h2 className='tasks'>Total tasks: {tasks.items.length}</h2>
        <p className='completed'>Completed: {completed}</p>
        <p className='records'>Total Records: {records.items.length}</p>
      </div>
    );
  }

  return <>{renderProfile()}</>;
}

const mapStateToProps = state => ({
  appState: state
});

const mapDispatchToProps = dispatch => ({
  handleDeleteUser: () => dispatch(fetchUser('delete_user')),
  handleFetchTasks: () => dispatch(fetchTasks()),
  handleFetchRecords: () => dispatch(fetchRecords())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)