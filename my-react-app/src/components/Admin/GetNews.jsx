import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';
// import './myinfo.css'

export function GetNews() {
  const { setPageTitle } = useContext(AppContext)
  
  useEffect(() => {
    setPageTitle('GET NEWS')
    return () => {
    };
  }, [ setPageTitle ]);

    return <>

      <div className="myheader">
          <h2>ADMIN GETS NEWS</h2>
      </div>
    
    </>
}