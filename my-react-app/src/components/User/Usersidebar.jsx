import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './usersidebar.css';
import { AppContext } from '../../Context/App_Context';



export function Usersidebar(props) {
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
    <nav className={`usersidebar ${isOpen ? 'open' : ''}`} id='usersidebar'>
      <ul>
      <li>
          <Link to="#" onClick={onClose} className='userdash' id='userdash'>
           <Icon icon="tabler:xbox-x" className='userdashicon' width='30'/><span>User-Dashboard</span>
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

    <div className="UserSideBareScroll">
      <ul>
        <li>
          <Link to="./feeds" onClick={onClose}>
            Feeds
          </Link>
        </li>

        <li>
          <Link to="./userprofile" onClick={onClose}>
            My-Profile
          </Link>
        </li>

        <li>
          <Link to="./usercourses" onClick={onClose}>
            My-Courses
          </Link>
        </li>

        <li>
          <Link to="./addcourse" onClick={onClose}>
            Add-Course
          </Link>
        </li>
        
        <li>
          <Link to="./updateprofile" onClick={onClose}>
            Update Profile
          </Link>
        </li>

        <li>
          <Link to="./userprofile" onClick={onClose}>
            Profile Image
          </Link>
        </li>

        {
         isLoggedIn() && getStoredUserObj().role === 'admin' &&
          (
          <li>
            <Link to="/Admin" onClick={onClose}>
              Admin-Dashboard
            </Link>
          </li>
          )
        }

    </ul>
  </div>
    <ul>

         <li onClick={ handleLogout } >
         <Link >
            Log out
          </Link>
        </li>
      </ul>
    </nav>
  );
};