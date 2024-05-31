import React from 'react';

const Task = ({ task, index, toggleTaskCompletion }) => {
  return (
    <div className={`task ${task.completed ? 'completed' : ''}`} onClick={() => toggleTaskCompletion(index)}>
      {task.text}
    </div>
  );
};

export default Task;
