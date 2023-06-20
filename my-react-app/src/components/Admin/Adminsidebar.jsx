import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

import './adminsidebar.css';
import { AppContext } from '../../Context/App_Context';



export function Adminsidebar(props) {
  const { getStoredUserObj, logout, isLoggedIn } = useContext(AppContext)

  const navigate = useNavigate();

    let namex
   if(isLoggedIn() && getStoredUserObj()){
    namex = `${getStoredUserObj().firstName.toUpperCase()} ${getStoredUserObj().middleName.toUpperCase()} ${getStoredUserObj().lastName.toUpperCase()}`
   } 

  const handleLogout = () => {  
    logout()
     navigate(`/`)
  } 

  const { isOpen, onClose } = props;

  return (
    <nav className={`sidebar ${isOpen ? 'open' : ''}`} id='sidebar'>
      <ul>
      <li>
          <Link to="#" onClick={onClose} className='dash' id='dash'>
            <Icon Icon icon="tabler:xbox-x" className='dashicon' width='30'/><span>Admin-Dashboard</span> 
          </Link>
        </li>

                
        <li>
          <Link >
          {"GREETINGS"}
          <br />
            { namex }
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
          <Link to="./changeprofileimage" onClick={onClose}>
            Change Profile Image
          </Link>
        </li>
        
        <li>
          <Link to="./createcourse" onClick={onClose}>
            Create Course
          </Link>
        </li>

        <li>
          <Link to="./createfeed" onClick={onClose}>
            Create Feed
          </Link>
        </li>

        <li>
          <Link to="./getfeeds" onClick={onClose}>
             Feeds
          </Link>
        </li>

        
        <li>
          <Link to="./adminsupport" onClick={onClose}>
             Support
          </Link>
        </li>

        {
          isLoggedIn() && getStoredUserObj().role === 'admin' &&
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
            Log out
          </Link>
          
        </li>
  
      </ul>
    </nav>
  );
}

;