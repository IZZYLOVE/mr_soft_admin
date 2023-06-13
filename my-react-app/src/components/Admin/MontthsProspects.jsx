import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';
// import './myinfo.css'

export function MonthsPros() {
  const { setPageTitle } = useContext(AppContext)
  
  useEffect(() => {
    setPageTitle("MONTH'S PROSPECTS")
    return () => {
    };
  }, [ setPageTitle ]);
   
      return <>

        <div className="myheader">
            <h2>Months Prospects</h2>
        </div>
      
      
      </>
}