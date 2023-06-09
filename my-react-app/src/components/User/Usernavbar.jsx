import './usernavbar.css'
import { useState } from 'react';
import { Usersidebar } from './Usersidebar';
import { Icon } from '@iconify/react';

export function Usernavbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
    

  return (
    <div className="user-dashboard">
      <Usersidebar isOpen={sidebarOpen} onClose={toggleSidebar} />

      <div className="usernav">
        <div onClick={toggleSidebar} className='toggle'>
          <Icon icon="ic:outline-legend-toggle" width='30' id='navicon' />
        </div>
       </div>
     </div>
  )
         

}

