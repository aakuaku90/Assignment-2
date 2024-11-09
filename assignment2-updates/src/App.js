// src/App.js
import React, { useContext, useState } from 'react';
import Header from './Components/Header';
import Nav from './Components/Nav';
import MainContent from './Components/MainContent';
import { TaskContext } from './Contexts/TaskContext';
import './index.css';

const App = () => {
  const { totalTasks, uncompletedTasks } = useContext(TaskContext);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [searchText, setSearchText] = useState("");

  const toggleNav = () => setIsNavVisible(!isNavVisible);
  const handleSearchChange = (searchValue) => setSearchText(searchValue);

  return (
    <>
      <Header 
        totalTasks={totalTasks} 
        uncompletedTasks={uncompletedTasks} 
        toggleNav={toggleNav} 
        handleSearchChange={handleSearchChange} 
      />
      <div className="app-container" style={{ gridTemplateColumns: isNavVisible ? '300px 1fr' : '1fr' }}>
        {isNavVisible && <Nav uncompletedTasks={uncompletedTasks} />}
        <MainContent searchText={searchText} />
      </div>
    </>
  );
};

export default App;