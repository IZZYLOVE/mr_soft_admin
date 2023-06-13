import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';
// import './myinfo.css'

export function Enquiries() {
  const { setPageTitle } = useContext(AppContext)
  
  useEffect(() => {
    setPageTitle('ENQUIRIES')
    return () => {
    };
  }, [ setPageTitle ]);
   
      return <>

        <div className="myheader">
            <h2>All Enquiries</h2>
        </div>
      
      
      </>
}