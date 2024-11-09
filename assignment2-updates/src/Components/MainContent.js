// src/components/MainContent.js
import React, { useContext, useState } from 'react';
import { TaskContext } from '../Contexts/TaskContext';
import addtaskicon from '../assets/add_task_icon.png';

const MainContent = ({ searchText }) => {
  const { tasks, addTask, removeTask, updateTask, completeTask } = useContext(TaskContext);
  const [taskName, setTaskName] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");

  // Filter tasks based on search text
  const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(searchText.toLowerCase()));

  // Handle adding a new task
  const handleAddTask = () => {
    if (taskName.trim() !== "") {
      addTask(taskName);
      setTaskName("");
      setShowAddTask(false);
    }
  };

  // Handle editing a task
  const handleEditTask = (id, name) => {
    setEditTaskId(id);
    setEditTaskName(name);
  };

  // Save the edited task name
  const saveTaskName = (id) => {
    if (editTaskName.trim() !== "") {
      updateTask(id, editTaskName);
      setEditTaskId(null);
    }
  };

  // Toggle the visibility of the add task form
  const toggleAddTaskVisibility = () => setShowAddTask(!showAddTask);

  return (
    <main id="main-nav">
      <h1>Inbox</h1>
      <section className='myTasks'>
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => completeTask(task.id)}
              />
              {editTaskId === task.id ? (
                <input
                  type="text"
                  className="input-large"
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(e.target.value)}
                  onBlur={() => saveTaskName(task.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter') saveTaskName(task.id); }}
                  autoFocus
                />
              ) : (
                <span 
                  onClick={() => handleEditTask(task.id, task.name)}
                  style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                >
                  {task.name}
                </span>
              )}
              {/* Assign the 'deletebtn' class to the Delete button */}
              <button className="deletebtn" onClick={() => removeTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
      {!showAddTask && (
        <section className='starttaskbtn' onClick={toggleAddTaskVisibility}>
          <div><img src={addtaskicon} alt="Add task icon" /></div>
          <p>Add task</p>
        </section>
      )}
      {showAddTask && (
        <section className='add-task-main'>
          <input
            id="task-name"
            type="text"
            placeholder="Task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAddTask(); }}
          />
          <div className='cabtn'>
            <button className="cancelbtn" onClick={toggleAddTaskVisibility}>Cancel</button>
            <button className="addtaskbtn" onClick={handleAddTask}>Add task</button>
          </div>
        </section>
      )}
    </main>
  );
};

export default MainContent;