import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';
// import './myinfo.css'

export function AdminSupport() {
  const { setPageTitle } = useContext(AppContext)
  useEffect(() => {
    setPageTitle('ADMIN SUPPORT')
    return () => {
    };
  }, [ setPageTitle ]);
   
      return <>

        <div className="myheader">
            <h2>ADMIN SUPPORT HANDLES USER ISSUES</h2>
        </div>
      
      
      </>
}