import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './adminsidebar.css';

export function Adminsidebar(props) {
  const { isOpen, onClose } = props;

  return (
    <nav className={`sidebar ${isOpen ? 'open' : ''}`} id='sidebar'>
      <ul>
      <li>
          <Link to="#" onClick={onClose} className='dash' id='dash'>
          <Icon icon="ic:outline-legend-toggle" className='dashicon' width='30'/><span>Admin-Dashboard</span> 
          </Link>
        </li>
        
        <li>
          <Link to="stats" onClick={onClose}>
            Stats
          </Link>
        </li>
        
        <li>
          <Link to="myinfo" onClick={onClose}>
            My Info 
          </Link>
        </li>

        <li>
          <Link to="/users" onClick={onClose}>
            Users
          </Link>
        </li>

        <li>
          <Link to="/classes" onClick={onClose}>
            Classes
          </Link>
        </li>
                                                        
        <li>
          <Link to="/register" onClick={onClose}>
             Add User
          </Link>
        </li>

        <li>
          <Link to="#" onClick={onClose}>
             Remove users
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
