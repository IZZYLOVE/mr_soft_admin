import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import './usersidebar.css';
import { AppContext } from '../../Context/App_Context';

const API_base_url = 'http://127.0.0.1:7300/';


export function Usersidebar(props) {
  const { getStoredUserObj } = useContext(AppContext)


  
const navigate = useNavigate();


const handleLogout = () => {  
  localStorage.removeItem(`${API_base_url}token`)
  localStorage.removeItem(`${API_base_url}User.serialized`)
  navigate(`/`)
} 
  
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
          <Link >
          {"GREETINGS"}
          <br />
            {`${getStoredUserObj().firstName.toUpperCase()} ${getStoredUserObj().middleName.toUpperCase()} ${getStoredUserObj().lastName.toUpperCase()}`}
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
          getStoredUserObj().role === 'admin' &&
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