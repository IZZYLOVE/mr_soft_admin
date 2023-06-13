import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';
// import './myinfo.css'

export function DefferedStudents() {
  const { setPageTitle } = useContext(AppContext)
  
  useEffect(() => {
    setPageTitle('DEFFERED STUDENTS')
    return () => {
    };
  }, [ setPageTitle ]);
   
      return <>

        <div className="myheader">
            <h2>DEFFERED STUDENTS</h2>
        </div>
      
      
      </>
}