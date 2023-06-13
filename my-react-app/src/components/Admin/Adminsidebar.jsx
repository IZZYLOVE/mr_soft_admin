import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

import './adminsidebar.css';
import { AppContext } from '../../Context/App_Context';

const Rooturl = 'http://127.0.0.1:7300/';


export function Adminsidebar(props) {
  const { getStoredUserObj } = useContext(AppContext)

  const navigate = useNavigate();


  const handleLogout = () => {  
    localStorage.removeItem(`${Rooturl}token`)
    localStorage.removeItem(`${Rooturl}User.serialized`)
    navigate(`/`)
  } 

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
          <Link >
          {"GREETINGS"}
          <br />
            {`${getStoredUserObj().firstName.toUpperCase()} ${getStoredUserObj().middleName.toUpperCase()} ${getStoredUserObj().lastName.toUpperCase()}`}
          </Link>
        </li>
      </ul>
  <div  className="AdminSideBareScroll">
      <ul>
        <li>
          <Link to="./stats" onClick={onClose}>
            Stats
          </Link>
        </li>

        <li>
          <Link to="./users" onClick={onClose}>
            Users
          </Link>
        </li>


        <li>
          <Link to="./allcourses" onClick={onClose}>
            Courses
          </Link>
        </li>

               
        <li>
          <Link to="./allprospects" onClick={onClose}>
            All Prospects
          </Link>
        </li>

        <li>
          <Link to="./enquiries" onClick={onClose}>
            Enquiries
          </Link>
        </li>

        <li>
          <Link to="./approveuser" onClick={onClose}>
             Approve User Access
          </Link>
        </li>

        <li>
          <Link to="./graduates" onClick={onClose}>
             Graduates
          </Link>
        </li>

        <li>
          <Link to="./removeuser" onClick={onClose}>
             Remove users
          </Link>
        </li>

        <li>
          <Link to="./myprofile" onClick={onClose}>
            My Profile
          </Link>
        </li>

        <li>
          <Link to="./profileupdate" onClick={onClose}>
            My Profile Update
          </Link>
        </li>

        <li>
          <Link to="./profileimage" onClick={onClose}>
            My Profile Image
          </Link>
        </li>

        <li>
          <Link to="./adminchangeprofileimage" onClick={onClose}>
            Change Profile Image
          </Link>
        </li>
        
        <li>
          <Link to="./createcourse" onClick={onClose}>
            Create Course
          </Link>
        </li>

        <li>
          <Link to="./createnews" onClick={onClose}>
            Create News
          </Link>
        </li>

        <li>
          <Link to="./getnews" onClick={onClose}>
             News
          </Link>
        </li>

        
        <li>
          <Link to="./adminsupport" onClick={onClose}>
             Support
          </Link>
        </li>

        {
          getStoredUserObj().role === 'admin' &&
          (
          <li>
            <Link to="/User" onClick={onClose}>
              Student-Dashboard
            </Link>
          </li>
          )
        }

      </ul>
    </div>
      <ul>

        <li onClick={ handleLogout }  >
          <Link >
            Log_out
          </Link>
          
        </li>
  
      </ul>
    </nav>
  );
}

;