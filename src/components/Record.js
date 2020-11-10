import React from 'react';
import date from 'date-and-time';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const Record = ({ record, task }) => {
  const dateTime = record.created_at.split('T');
  const dateArray = dateTime[0].split('-');
  const pattern = date.compile('MMM D YYYY');
  const dateFormat = date.format(
    new Date(dateArray[0], dateArray[1], dateArray[2]),
    pattern,
  );

  const perStyle = { color: '' };

  if (record.percentage > 50) perStyle.color = '#FF8000';
  if (record.percentage > 85) perStyle.color = '#FF0000';

  if (task === undefined) {
    return (
      <Link
        key={record.created_at}
        to={{
          pathname: `/dashboard/tasks/${record.task_id}/${record.id}`,
          id: record.id,
        }}
        className="record-item"
      >
        <p>{dateFormat}</p>
        <span style={perStyle}>{`${record.percentage}%`}</span>
      </Link>
    );
  } return (
    <Link
      key={record.created_at}
      to={{
        pathname: `/dashboard/tasks/${record.task_id}/${record.id}`,
        id: record.id,
      }}
      className="record-task"
    >
      <p className="date">{dateTime[0]}</p>
      <p className="task-name">{task.name}</p>
      <span style={perStyle}>{`${record.percentage}%`}</span>
    </Link>
  );
};

Record.propTypes = {
  record: PropTypes.shape({
    created_at: PropTypes.string,
    percentage: PropTypes.number,
    task_id: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
  task: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Record.defaultProps = { task: undefined };

export default Record;
