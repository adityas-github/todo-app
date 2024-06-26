import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState("all");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputText.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now(), text: inputText, completed: false },
      ]);
      setInputText("");
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
    setEditText("");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return task.completed;
    } else {
      return !task.completed;
    }
  });
  const progressCircumference = 2 * Math.PI * 40; // Circumference of the progress circle
  const percentCompleted =
    tasks.length > 0
      ? Math.floor(
          (tasks.filter((task) => task.completed).length / tasks.length) * 100
        )
      : 0;

  return (
    <div className="App">
      <div className="HeaderContainer">
        <h1>Modern To-Do App</h1>
        <div className="ProgressBarContainer">
          <div className="ProgressCircle">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" className="ProgressCircleBg" />
              <circle
                cx="50"
                cy="50"
                r="40"
                className="ProgressCircleFill"
                style={{
                  strokeDasharray: `${
                    (percentCompleted / 100) * progressCircumference
                  } ${progressCircumference}`,
                }}
              />
            </svg>
            <div className="ProgressText">{percentCompleted}%</div>
          </div>
        </div>
      </div>
      <div className="Container">
        <div className="AddTaskContainer">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter task"
            className="AddTaskInput"
          />
          <button className="AddButton" onClick={addTask}>
            <i className="fas fa-plus"></i>
          </button>
        </div>

        <div className="TabsContainer">
          <button
            className={`TabButton ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`TabButton ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`TabButton ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
        </div>
        <ul className="TaskList">
          {filteredTasks.length === 0 ? (
            <li className="NoTasksMessage">No tasks added yet</li>
          ) : (
            filteredTasks.map((task) => (
              <li
                key={task.id}
                className={`TaskItem ${task.completed ? "completed" : ""}`}
              >
                {editTaskId === task.id ? (
                  <div className="EditTaskContainer">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="EditTaskInput"
                    />
                    <button className="SaveButton" onClick={saveEditedTask}>
                      <i className="fas fa-check"></i>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="TaskCheckbox">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                      />
                    </div>
                    <span className="TaskText">{task.text}</span>
                    <div className="TaskButtons">
                      <button
                        className="EditButton"
                        onClick={() => editTask(task.id, task.text)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="DeleteButton"
                        onClick={() => deleteTask(task.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
