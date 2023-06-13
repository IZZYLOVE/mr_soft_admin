import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';
// import './myinfo.css'

export function ApproveUserAccess() {
  const { setPageTitle } = useContext(AppContext)
  
  useEffect(() => {
    setPageTitle('APPROVE USER')
    return () => {
    };
  }, [ setPageTitle ]);
   
      return <>

        <div className="myheader">
            <h2>Approve User Acess</h2>
        </div>
      
      
      </>
}