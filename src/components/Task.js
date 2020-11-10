import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const Task = ({ task }) => {
  const comStyle = { color: '' };

  if (task.completion > 50) comStyle.color = '#FF8000';
  if (task.completion > 85) comStyle.color = '#FF0000';

  return (
    <Link
      key={task.created_at}
      to={{ pathname: `/dashboard/tasks/${task.id}` }}
      className="task-item"
    >
      <p>{task.name}</p>
      <span style={comStyle}>{`${task.completion}%`}</span>
    </Link>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    created_at: PropTypes.string,
    completion: PropTypes.number,
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default Task;
