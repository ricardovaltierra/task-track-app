import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { faThumbtack, faTrophy, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchTasks } from '../actions/task';
import { fetchRecords }  from '../actions/record';

const Progress = ({
  onReset,
  handleFetchTasks,
  handleFetchRecords,
  appState
}) => {

  useEffect(() => {
    handleFetchTasks();
    handleFetchRecords();
  }, [handleFetchTasks, handleFetchRecords]);

  const { tasks, records } = appState;

  const mainColor = { color: '#42b5e8' };

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
          <div className='prog'>
            <span>Tasks</span>
            <FontAwesomeIcon icon={faThumbtack} size='2x' style={mainColor}/>
            <p>{tasks.items.length}</p>
          </div>
          <div className='prog'>
            <span>Completed</span>
            <FontAwesomeIcon icon={faTrophy} size='2x' style={mainColor} />
            <p>{completed}</p>
          </div>
          <div className='prog'>
            <span>Records</span>
            <FontAwesomeIcon icon={faCalendar} size='2x' style={mainColor} />
            <p>{records.items.length}</p>
          </div>
          <button onClick={() => onReset()}>Reset progress</button>
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