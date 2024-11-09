// src/components/Header.js
import React from 'react';
import menuIcon from '../assets/menu_icon.png';
import searchIcon from '../assets/search_icon.png';
import checkIcon from '../assets/check_icon.png';

const Header = ({ totalTasks, uncompletedTasks, toggleNav, handleSearchChange }) => (
  <header>
      <div id="header-left-side">
          <img src={menuIcon} alt="Menu Icon" onClick={toggleNav} style={{ cursor: 'pointer' }} />
          <div id="quick-find-container">
              <img id="search-icon" src={searchIcon} alt="Search Icon" />
              <input 
                id="quick-find" 
                type="text" 
                placeholder="Quick Find"
                onChange={(e) => handleSearchChange(e.target.value)}
              />
          </div>
      </div>
      <div id="header-right-side">
          <img id="check-icon" src={checkIcon} alt="Check Icon" />
          <p id="task-count">{totalTasks}/{uncompletedTasks}</p>
      </div>
  </header>
);

export default Header;