import React from 'react';
import date from 'date-and-time';
import { Link } from 'react-router-dom';

const Record = ({ record, task }) => {

  const dateTime = record.created_at.split("T");
  const dateArray = dateTime[0].split("-");
  const pattern = date.compile('MMM D YYYY');
  const dateFormat = date.format(new Date(dateArray[0], dateArray[1], dateArray[2]), pattern);

  if (task === undefined) {

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

  }

  else

    return (
      <Link
        key={record.created_at}
        to={{
          pathname: `/dashboard/tasks/${record.task_id}/${record.id}`,
          id: record.id
        }}
        className='record-task'
      >
        <p className='date'>{dateTime[0]}</p>
        <p className='task-name'>{task.name}</p>
        <span>{`${record.percentage}%`}</span>
      </Link>
    );
};

export default Record;