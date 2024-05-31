import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, toggleTaskCompletion }) => {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <Task key={index} task={task} index={index} toggleTaskCompletion={toggleTaskCompletion} />
      ))}
    </div>
  );
};

export default TaskList;
