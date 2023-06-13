import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';
// import './myinfo.css'

export function MonthsReg() {
  const { setPageTitle } = useContext(AppContext)
  
  useEffect(() => {
    setPageTitle("MONTH'S REGISTRATIONS")
    return () => {
    };
  }, [ setPageTitle ]);

    return <>

      <div className="myheader">
          <h2>THIS MONTHS REGISTRATIONS</h2>
      </div>
    
    </>
}