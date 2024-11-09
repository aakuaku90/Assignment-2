// src/contexts/TaskContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const TaskContext = createContext();

// Create the provider component
const TaskProvider = ({ children }) => {
  // Initialize tasks and completedTasks from localStorage or as empty arrays
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [completedTasks, setCompletedTasks] = useState(
    JSON.parse(localStorage.getItem("completedTasks")) || []
  );

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Persist completedTasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  // Function to add a new task
  const addTask = (name) => {
    const newTask = { id: Date.now(), name, completed: false };
    setTasks([...tasks, newTask]);
  };

  // Function to remove a task by id
  const removeTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  // Function to update a task's name by id
  const updateTask = (id, name) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, name } : task
    );
    setTasks(updatedTasks);
  };

  // Function to mark a task as completed by id (moves it to completedTasks)
  const completeTask = (id) => {
    const taskToComplete = tasks.find(task => task.id === id);
    if (taskToComplete) {
      // Remove from tasks
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      
      // Add to completedTasks
      setCompletedTasks([...completedTasks, { ...taskToComplete, completed: true }]);
    }
  };

  // Calculate total and uncompleted tasks
  const totalTasks = tasks.length + completedTasks.length;
  const uncompletedTasks = tasks.length;

  return (
    <TaskContext.Provider
      value={{
        tasks,
        completedTasks,
        addTask,
        removeTask,
        updateTask,
        completeTask,
        totalTasks,
        uncompletedTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;