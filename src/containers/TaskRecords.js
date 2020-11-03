import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRecords }  from '../actions/record';
import Record from '../components/Record';

const TaskRecords = ({ handleFetchTRecords, tRecordsState }) => {
  useEffect(() => {
    handleFetchTRecords();
  }, [handleFetchTRecords]);

  const renderTaskRecords = () => {
    if (tRecordsState.loading) return <di>Loading...</di>;
    if (tRecordsState.errors.length > 1) return <div>Unable to load records, please try again</div>;
    return tRecordsState.items.map(
      record => <Record key={record.id} record={record} />
    );
  }
  
  return (
    <div className='trecord-list'>
      <h1>Your Task Records</h1>
      <div className='trecord-items'>
        {renderTaskRecords()}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  tRecordsState: state.records
});

const mapDispatchToProps = dispatch => ({
  handleFetchTRecords: () => dispatch(fetchRecords('task-records'))
}); 

export default connect(mapStateToProps, mapDispatchToProps)(TaskRecords);