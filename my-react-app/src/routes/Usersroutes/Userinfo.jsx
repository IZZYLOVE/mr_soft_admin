
import React, { useState } from 'react';
import { Usersidebar } from '../Usersidebar';
import { Icon } from '@iconify/react';
import './userinfo.css'
import { Link } from 'react-router-dom';


export function Userinfo() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="user-dashboard">
      <Usersidebar isOpen={sidebarOpen} onClose={toggleSidebar} />

      <div className="userinav">
        <div onClick={toggleSidebar} className='toggle'><Icon icon="ic:outline-legend-toggle" width='30' id='navicon'/>
           <span className='userinavdetails'>
            <Link to='/userinfo'>Users@gmail.com </Link>
            </span>
        </div>
      </div>

      <div className='infocontent'>
         <span className='img'>judedavid688@gmail.com</span> 
         <div className='imgname'><b>Anthony Maxwell</b></div>
         <div className='usersinfo'>
            
         </div>
     </div>

    </div>
  );
}


