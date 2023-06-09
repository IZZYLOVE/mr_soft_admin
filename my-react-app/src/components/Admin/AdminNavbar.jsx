import { Adminsidebar } from './Adminsidebar';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import './adminavbar.css'

export function AdminNavbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="admin-dashboard">
          <Adminsidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
    
          <div className="adminav">
            <div onClick={toggleSidebar} className='toggle'>
              <Icon icon="ic:outline-legend-toggle" width='30' className='navicon' />
              <span className='navdetails'>Admin-Email</span>
            </div>
          </div>
          </div>
)
}