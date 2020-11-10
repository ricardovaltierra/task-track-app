import React from "react";
import { Link } from "react-router-dom";

const Task = ({ task }) => {
  const comStyle = { color: "" };

  if (task.completion > 50) comStyle.color = "#FF8000";
  if (task.completion > 85) comStyle.color = "#FF0000";

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

export default Task;
