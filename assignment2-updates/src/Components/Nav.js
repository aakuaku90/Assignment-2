// src/components/Nav.js
import React from 'react';
import inboxIcon from '../assets/inbox_icon.png';
import calendarIcon from '../assets/calendar_icon.png';
import upcomingIcon from '../assets/upcoming_icon.png';

const Nav = ({ uncompletedTasks }) => (
  <nav>
      <ul>
          <li className='hovernaveff'>
              <img src={inboxIcon} alt="Inbox Icon" />
              <span className="text">Inbox <span className="count">{uncompletedTasks}</span></span>
          </li>
          <li className='hovernaveff'>
              <img src={calendarIcon} alt="Calendar Icon" />
              <span className="text">Today <span className="count">5</span></span>
          </li>
          <li className='hovernaveff'>
              <img src={upcomingIcon} alt="Upcoming Icon" />
              <span className="text">Upcoming <span className="count">0</span></span>
          </li>
      </ul>
  </nav>
);

export default Nav;