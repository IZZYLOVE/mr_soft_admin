import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';
// import './myinfo.css'

export function GetContactMessages() {
  const { setPageTitle } = useContext(AppContext)
  
  useEffect(() => {
    setPageTitle('CONTACT MESSAGES')
    return () => {
    };
  }, [ setPageTitle ]);

    return <>

      <div className="myheader">
          <h2>ADMIN GETS CONTACT MESSAGES</h2>
      </div>
    
    </>
}