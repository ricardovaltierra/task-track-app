import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../actions/task';
import { fetchRecords }  from '../actions/record';

const Progress = ({
  handleFetchTasks,
  handleFetchRecords,
  appState
}) => {

  useEffect(() => {
    handleFetchTasks();
    handleFetchRecords();
  }, [handleFetchTasks, handleFetchRecords]);

  const { tasks, records } = appState;

  const renderProgress = () => {
    if (tasks.loading || records.loading) 
      return <div>Loading...</div>;
    if (tasks.errors.length > 1 || records.errors.length > 1)
      return <div>Unable to load profile, try again please</div>;
    if(tasks && records) {
      let completed = 0;

      for (let i = 0; i < tasks.items.length; i += 1) {
        if (tasks.items[i].completion === 100)
          completed += 1;
      }

      return (
        <div className='progress'>
          <p className='tasks'>Total tasks: {tasks.items.length}</p>
          <p className='completed'>Completed: {completed}</p>
          <p className='records'>Total Records: {records.items.length}</p>
          <button>Reset progress</button>
        </div>
      );
    }
  }

  return <>{renderProgress()}</>;
};

const mapStateToProps = state => ({
  appState: state
});

const mapDispatchToProps = dispatch => ({
  handleFetchTasks: () => dispatch(fetchTasks()),
  handleFetchRecords: () => dispatch(fetchRecords())
})

export default connect(mapStateToProps, mapDispatchToProps)(Progress)