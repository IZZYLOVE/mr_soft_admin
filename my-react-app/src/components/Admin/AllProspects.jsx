import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';
// import './myinfo.css'

export function AllProspects() {
  const { setPageTitle } = useContext(AppContext)
  
  useEffect(() => {
    setPageTitle('PROSPECTS')
    return () => {
    };
  }, [ setPageTitle ]);
   
      return <>

        <div className="myheader">
            <h2>All Prospects</h2>
        </div>
      
      
      </>
}