import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputText.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: inputText, completed: false }]);
      setInputText('');
    }
  };

  const toggleTask = (id) => {
    if (editTaskId !== id) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, text) => {
    setEditTaskId(id);
    setEditText(text);
  };

  const saveEditedTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editTaskId ? { ...task, text: editText } : task
      )
    );
    setEditTaskId(null);
    setEditText('');
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'completed') {
      return task.completed;
    } else {
      return !task.completed;
    }
  });

  return (
    <div className="App">
      <h1>Modern To-Do App</h1>
      <div className="AddTask">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter task"
        />
        <button className="AddButton" onClick={addTask}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="Tabs">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
        <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
      </div>
      <ul className="TaskList">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={task.completed ? 'completed' : ''}
          >
            {editTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={saveEditedTask}>
                  <i className="fas fa-check"></i>
                </button>
              </>
            ) : (
              <>
                <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
                <span>{task.text}</span>
                <div className="TaskButtons">
                  <button onClick={() => editTask(task.id, task.text)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => deleteTask(task.id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
