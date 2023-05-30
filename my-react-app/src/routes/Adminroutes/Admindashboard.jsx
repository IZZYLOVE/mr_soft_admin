import {Card} from "../../components/Card"
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
          <span className='navdetails'>Admin-Email <Icon icon="mdi:user-circle" className='navicon' width='30'/></span>
        </div>
      </div>

      <div className='Content'>
        <h2>Welcome, Admin</h2> 
        <Card title="Project1" text="This project is built with Js, ReactJs, Sass, HTML, css etc."/>
        
        </div>
      </div>
  );
}
