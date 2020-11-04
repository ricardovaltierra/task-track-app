import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRecords }  from '../actions/record';
import Record from '../components/Record';

const RecordList = ({ handleFetchRecords, recordsState }) => {

  useEffect(() => {
    handleFetchRecords();
  }, [handleFetchRecords]);

  const renderRecords = () => {
    if (recordsState.loading) return <div>Loading...</div>;
    if (recordsState.errors.length > 1) return <div>Unable to load records, please try again.</div>;
    return recordsState.items.map(
      record => <Record key={record.id} record={record} />
    );
  };

  return (
    <div className='record-list'>
      <h1>Your Records</h1>
      <div className='record-items'>
        {renderRecords()}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  recordsState: state.records
});

const mapDispatchToProps = dispatch => ({
  handleFetchRecords: () => dispatch(fetchRecords('records'))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);