import {Card} from "../../components/Card"
import {Bigcard} from "../../components/Bigcard"
import React, { useState } from 'react';
import { Adminsidebar } from '../Adminsidebar';
import { Icon } from '@iconify/react';
import './dashboard.css';

export function Admindashboard() {
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

      <div className='Content'>
        <h2>Welcome, Admin</h2> 
        <Card title="Project1" text="#"/>
        <Bigcard title="Project2" text="#"/>
        </div>
      </div>
  );
}
