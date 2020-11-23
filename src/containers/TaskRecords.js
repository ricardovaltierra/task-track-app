/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRecords, fetchTasks } from '../actions/fetchCalls';
import Record from '../components/Record';

const TaskRecords = ({ ...props }) => {
  const {
    handleFetchTasks, handleFetchTRecords, match, appState,
  } = props;

  useEffect(() => {
    handleFetchTasks();
    handleFetchTRecords();
  }, [handleFetchTasks, handleFetchTRecords]);

  const { params } = match;
  const { task_id } = params;

  const { tasks, records } = appState;

  const renderTask = () => {
    if (tasks.loading) return <div>Loading...</div>;
    if (tasks.errors.length > 1) {
      return <div>Unable to load records, please try again.</div>;
    }
    const task = tasks.items.find(task => parseInt(task_id, 10) === task.id);

    if (task) {
      return (
        <div className="task-info">
          <h1>{task.name}</h1>
          <h2>{task.description}</h2>
        </div>
      );
    }

    return '';
  };

  const renderTaskRecords = () => {
    if (records.loading) return <div>Loading...</div>;
    if (records.errors.length > 1) return <div>Unable to load records, please try again</div>;
    if (records && task_id) {
      const recordList = records.items.map(record => {
        if (parseInt(task_id, 10) === record.task_id) {
          return <Record key={record.id} record={record} />;
        }
        return '';
      });

      return (
        <>
          <div className="trecord-items">{recordList}</div>
          <Link to={`/dashboard/tasks/${task_id}/new`} className="record-new">
            <p>New record</p>
          </Link>
        </>
      );
    }

    return '';
  };

  return (
    <div className="trecord-list">
      {renderTask()}
      {renderTaskRecords()}
    </div>
  );
};

const mapStateToProps = state => ({
  appState: state,
});

const mapDispatchToProps = dispatch => ({
  handleFetchTRecords: () => dispatch(fetchRecords('load')),
  handleFetchTasks: () => dispatch(fetchTasks()),
});

TaskRecords.propTypes = {
  handleFetchTasks: PropTypes.func.isRequired,
  handleFetchTRecords: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      task_id: PropTypes.string,
    }),
  }).isRequired,
  appState: PropTypes.shape({
    tasks: PropTypes.shape({
      loading: PropTypes.bool,
      errors: PropTypes.string,
      items: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    }),
    records: PropTypes.shape({
      loading: PropTypes.bool,
      errors: PropTypes.string,
      items: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    }),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskRecords);
