import { Adminsidebar } from '../Adminsidebar';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './myinfo.css'

export function Myinfo() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

      return <>
      <Adminsidebar isOpen={sidebarOpen} onClose={toggleSidebar} />

       <div className="mynav">
         <div onClick={toggleSidebar} className='toggle'><Icon icon="ic:outline-legend-toggle" width='30' id='mynavicon'/>
            <span className='mynavdetails'>Admin-Email <Icon icon="mdi:user-circle" className='mynavicon' width='30'/></span>
         </div>
       </div>
        <div className="myheader">
            <h2>MY INFORMATION</h2>
        </div>
      
      
      </>
}