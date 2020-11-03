import React from 'react';
import { Link } from 'react-router-dom';

const Record = ({ record }) => (
  <Link
    key={record.created_at}
    to={{
      pathname: `/tasks/${record.task_id}/${record.id}`,
      id: record.id
    }}
    className='record-item'
  >
    <p>Date: {record.created_at}</p>
    <span>{`${record.percentage}%`}</span>
  </Link>
);

export default Record;