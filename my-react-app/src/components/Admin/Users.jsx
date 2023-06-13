import React, { useContext, useEffect } from 'react';
import './users.css'
import { AppContext } from '../../Context/App_Context';

export function Users() {
    const { setPageTitle } = useContext(AppContext)
    
    useEffect(() => {
      setPageTitle('USERS')
      return () => {
      };
    }, [ setPageTitle ]);

  return (
    <div className="admin-dashboard">

      <div className='usercontent'>
       <h2>Users</h2> 
      </div>
    </div>
  );
}


