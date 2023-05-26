import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './usersidebar.css';

export function Usersidebar(props) {
  const { isOpen, onClose } = props;

  return (
    <nav className={`usersidebar ${isOpen ? 'open' : ''}`} id='usersidebar'>
      <ul>
      <li>
          <Link to="#" onClick={onClose} className='userdash' id='userdash'>
          <Icon icon="ic:outline-legend-toggle" className='userdashicon' width='30'/><span>User-Dashboard</span> 
          </Link>
        </li>
        
        <li>
          <Link to="/userdashboard" onClick={onClose}>
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/userinfo" onClick={onClose}>
            My-info
          </Link>
        </li>

        <li>
          <Link to="/" onClick={onClose}>
            My-Courses
          </Link>
        </li>
        
        <li>
          <Link to="/admindashboard" onClick={onClose}>
            Admin-Dashboard
          </Link>
        </li>
        
         <li>
          <Link to="/" onClick={onClose}>
            Log_out
          </Link>

        </li>
      </ul>
    </nav>
  );
}

;
