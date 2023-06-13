import { useContext, useEffect } from 'react';
// import './myinfo.css'
import '../General/myinfo.css'
import { AppContext } from '../../Context/App_Context';

export function Graduates() {
  const { setPageTitle } = useContext(AppContext)
  
  useEffect(() => {
    setPageTitle('GRADUATES')
    return () => {
    };
  }, [ setPageTitle ]);
   
      return <>

        <div className="myheader">
            <h2>LIST OF GRADUATED STUDENTS</h2>
        </div>
      
      
      </>
}