import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRecords }  from '../actions/record';
import { fetchTasks } from '../actions/task';
import Record from '../components/Record';

const TaskRecords = ({ ...props }) => {

  const { 
    handleFetchTasks,
    handleFetchTRecords,
    match,
    appState,
    } = props;

  useEffect(() => {
    handleFetchTasks();
    handleFetchTRecords();
  }, [handleFetchTasks, handleFetchTRecords]);

  const { params } = match;
  const { task_id } = params;

  const { tasks, records } = appState;

  const renderTask =  () => {
    if (tasks.loading) return <div>Loading...</div>;
    if (tasks.errors.length > 1) return <div>Unable to load records, please try again.</div>;
    
    const task = tasks.items.find(task => parseInt(task_id) === task.id);

    if (task) {
    return (
      <div className='task-info'>
        <h1>{task.name}</h1>
        <h2>{task.description}</h2>
      </div>);
    }
  }

  const renderTaskRecords = () => {
    if (records.loading) return <div>Loading...</div>;
    if (records.errors.length > 1) return <div>Unable to load records, please try again</div>;
    return records.items.map(
      record => {
        if (parseInt(task_id) === record.task_id)
          return <Record key={record.id} record={record} />
        return '';
      });
  }
  
  return (
    <div className='trecord-list'>
      {renderTask()}
      <div className='trecord-items'>
        {renderTaskRecords()}
      </div>
      <Link to='/dashboard/tasks/new' className='record-new'>
        <p>New record</p>
      </Link>
    </div>
  );
};

const mapStateToProps = state => ({
  appState: state

});

const mapDispatchToProps = dispatch => ({
  handleFetchTRecords: () => dispatch(fetchRecords('task-records')),
  handleFetchTasks: () => dispatch(fetchTasks())
}); 

export default connect(mapStateToProps, mapDispatchToProps)(TaskRecords);