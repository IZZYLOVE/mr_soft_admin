import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';
// import './myinfo.css'

export function ActiveStudents() {
  const { setPageTitle } = useContext(AppContext)
  useEffect(() => {
    setPageTitle('ACTIVE STUDENTS')
    return () => {
    };
  }, [ setPageTitle ]); 
   
      return <>

        <div className="myheader">
            <h2>ACTIVE STUDENTS</h2>
        </div>
      
      
      </>
}