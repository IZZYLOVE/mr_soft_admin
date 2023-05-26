import React, { useState } from 'react';
import { Adminsidebar } from '../Adminsidebar';
import { Icon } from '@iconify/react';
import './users.css'

export function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-dashboard">
      <Adminsidebar isOpen={sidebarOpen} onClose={toggleSidebar} />

      <div className="usernav">
        <div onClick={toggleSidebar} className='toggle'><Icon icon="ic:outline-legend-toggle" width='30' id='navicon'/>
           <span className='navdetails'>Admin-Email <Icon icon="mdi:user-circle" className='navicon' width='30'/></span>
        </div>
      </div>

      <div className='Content'>
       <h2>Users</h2> 
      </div>
    </div>
  );
}


