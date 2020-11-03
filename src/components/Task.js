import React from 'react';
import { Link } from 'react-router-dom';

const Task = ({ task }) => (
  <Link 
    key={task.created_at}
    to={{
      pathname: `/dashboard/tasks/${task.id}`,
      id: task.id
    }}
    className='task-item'
  >
    <p>{task.name}</p>
    <span>{`${task.completion}%`}</span>
    {console.log('task', task)}
  </Link>
);

export default Task;