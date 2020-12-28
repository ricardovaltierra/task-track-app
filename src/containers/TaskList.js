/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTasks } from '../actions/fetchCalls';
import Task from '../components/Task';

const TaskList = ({ handleFetchTasks, tasksState }) => {
  useEffect(() => {
    handleFetchTasks();
  }, [handleFetchTasks]);

  const renderTasks = () => {
    if (tasksState.loading) return <div>Loading...</div>;
    if (tasksState.errors.length > 1) {
      return <div>Unable to load tasks, try again</div>;
    }
    if (tasksState) {
      return tasksState.items.map(task => <Task key={task.id} task={task} />);
    }

    return '';
  };

  return (
    <div className="task-list">
      <h1>Tasks</h1>
      <div className="task-items">{renderTasks()}</div>
      <div className="empty-fill" />
      <Link to="/dashboard/tasks/new" className="task-new">
        <p>New task</p>
      </Link>
    </div>
  );
};

const mapStateToProps = state => ({
  tasksState: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  handleFetchTasks: () => dispatch(fetchTasks()),
});

TaskList.propTypes = {
  handleFetchTasks: PropTypes.func.isRequired,
  tasksState: PropTypes.shape({
    loading: PropTypes.bool,
    errors: PropTypes.string,
    items: PropTypes.array,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
