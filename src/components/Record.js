import React from 'react';
import date from 'date-and-time';
import { Link } from 'react-router-dom';

const Record = ({ record }) => {

  const dateTime = record.created_at.split("T");
  const dateArray = dateTime[0].split("-");
  const pattern = date.compile('MMM D YYYY');
  const dateFormat = date.format(new Date(dateArray[0], dateArray[1], dateArray[2]), pattern);
  

  return (
    <Link
      key={record.created_at}
      to={{
        pathname: `/dashboard/tasks/${record.task_id}/${record.id}`,
        id: record.id
      }}
      className='record-item'
    >
      <p>{dateFormat}</p>
      <span>{`${record.percentage}%`}</span>
    </Link>
  );
};

export default Record;