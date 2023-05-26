import React, { useState } from 'react';
import { Usersidebar } from '../Usersidebar';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import './userdashboard.css'

export function Userdashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="user-dashboard">
      <Usersidebar isOpen={sidebarOpen} onClose={toggleSidebar} />

      <div className="usernav">
        <div onClick={toggleSidebar} className='toggle'><Icon icon="ic:outline-legend-toggle" width='30' id='navicon'/>
           <span className='usernavdetails'>
            <Link to='/userinfo'>Users@gmail.com </Link>
            </span>
        </div>
      </div>

      <div className='Content'>
       <h2>Welcome 'User' </h2> 
          <div className="card">
            <div className="card1">
            {/* <p><b>Courses to choose from:</b> </p>  
            <p>Python<input type="checkbox" name="python" id="python" /></p>
            <p>JavaScript<input type="checkbox" name="javascript" id="python" /></p>
            <p>HTML<input type="checkbox" name="python" id="python" /></p>
            <p>CSS<input type="checkbox" name="python" id="python" /></p>
            <button>Select</button> */}
            </div>

          </div>
      </div>
    </div>
  );
}


