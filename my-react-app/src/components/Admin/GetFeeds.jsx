import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';
// import './myinfo.css'

export function GetFeeds() {
  const { setPageTitle } = useContext(AppContext)
  
  useEffect(() => {
    setPageTitle('GET FEEDS')
    return () => {
    };
  }, [ setPageTitle ]);

    return <>

      <div className="myheader">
          <h2>ADMIN GETS FEEDs</h2>
      </div>
    
    </>
}