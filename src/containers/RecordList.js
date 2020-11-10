import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchRecords } from "../actions/record";
import { fetchTasks } from "../actions/task";
import Record from "../components/Record";

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

  const mapTaskToComponent = (record, tasks) => {
    for (let i = 0; i < tasks.length; i++) {
      if (record.task_id === tasks[i].id)
        return <Record key={record.id} record={record} task={tasks[i]} />;
    }
  };

  const renderRecords = () => {
    if (recordsState.loading || tasksState.loading)
      return <div>Loading...</div>;
    if (recordsState.errors.length > 1 || tasksState.errors.length > 1)
      return <div>Unable to load records, please try again.</div>;
    if (recordsState && tasksState) {
      const recordList = recordsState.items.map((record) =>
        mapTaskToComponent(record, tasksState.items)
      );

      return (
        <>
          <div className="task-items">{recordList}</div>
          <Link to={`/dashboard/records/new`} className="task-new">
            <p>New record</p>
          </Link>
        </>
      );
    }
  };

  return (
    <div className="task-list">
      <h1>Records</h1>
      {renderRecords()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  recordsState: state.records,
  tasksState: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  handleFetchTasks: () => dispatch(fetchTasks()),
  handleFetchRecords: () => dispatch(fetchRecords()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);
