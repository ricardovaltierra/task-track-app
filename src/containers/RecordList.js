import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    if(recordsState) {
      const recordList = recordsState.items.map(
        record => <Record key={record.id} record={record} />
      );

      return (
        <>
          <div className='task-items'>
            {recordList}
          </div>
          <Link to={`/dashboard/records/new`} className='task-new'>
            <p>New record</p>
          </Link>
        </>);
    }
  };

  return (
    <div className='task-list'>
      <h1>Records</h1>
      {renderRecords()}
    </div>
  );
};

const mapStateToProps = state => ({
  recordsState: state.records
});

const mapDispatchToProps = dispatch => ({
  handleFetchRecords: () => dispatch(fetchRecords())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);