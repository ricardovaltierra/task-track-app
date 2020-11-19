/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTasks, fetchRecords } from '../actions/fetchCalls';
import Record from '../components/Record';

const RecordList = ({
  handleFetchRecords,
  handleFetchTasks,
  recordsState,
  tasksState,
}) => {
  useEffect(() => {
    handleFetchTasks();
    handleFetchRecords();
  }, [handleFetchTasks, handleFetchRecords]);

  const { loading, errors, items } = recordsState;

  const mapTaskToComponent = (record, tasks) => {
    for (let i = 0; i < tasks.length; i += 1) {
      if (record.task_id === tasks[i].id) {
        return <Record key={record.id} record={record} task={tasks[i]} />;
      }
    }

    return '';
  };

  const renderRecords = () => {
    if (loading || tasksState.loading) 
      return (
        <>
          <div>Loading...</div>
          <Link to="/dashboard/records/new" className="task-new" >
            <p>New record</p>
          </Link>
        </>
      );
    if (errors.length > 1 || tasksState.errors.length > 1) {
      return <div>Unable to load records, please try again.</div>;
    }
    if (recordsState && tasksState) {
      const recordList = items.map(record => mapTaskToComponent(record, tasksState.items));

      return (
        <>
          <div className="task-items">{recordList}</div>
          <Link to="/dashboard/records/new" className="task-new" >
            <p>New record</p>
          </Link>
        </>
      );
    }

    return '';
  };

  return (
    <div className="task-list">
      <h1>Records</h1>
      {renderRecords()}
    </div>
  );
};

const mapStateToProps = state => ({
  recordsState: state.records,
  tasksState: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  handleFetchTasks: () => dispatch(fetchTasks()),
  handleFetchRecords: () => dispatch(fetchRecords()),
});

RecordList.propTypes = {
  handleFetchTasks: PropTypes.func.isRequired,
  handleFetchRecords: PropTypes.func.isRequired,
  tasksState: PropTypes.shape({
    loading: PropTypes.bool,
    errors: PropTypes.string,
    items: PropTypes.array,
  }).isRequired,
  recordsState: PropTypes.shape({
    loading: PropTypes.bool,
    errors: PropTypes.string,
    items: PropTypes.array,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);
