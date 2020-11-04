import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTasks } from '../actions/task';
import Task from '../components/Task';

const TaskList = ({ handleFetchTasks, tasksState }) => {

  useEffect(() => {
    handleFetchTasks();
  }, [handleFetchTasks]);

  const renderTasks  = () => {
    if (tasksState.loading) return <div>Loading...</div>;
    if (tasksState.errors.length > 1) return <div>Unable to load tasks, try again</div>;
    if (tasksState) {
      return tasksState.items.map(
        task => <Task key={task.id} task={task} />
      );
    }
  }

  return (
    <div className='task-list'>
      <h1>Tasks</h1>
      <div className='task-items'>
        {renderTasks()}
      </div>
      <Link to='/dashboard/tasks/new'className='task-new'>
        <p>New task</p>
      </Link>
    </div>
  );
};

const mapStateToProps = state => ({
  tasksState: state.tasks
}); 

const mapDispatchToProps = dispatch => ({
  handleFetchTasks: () => dispatch(fetchTasks())
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);