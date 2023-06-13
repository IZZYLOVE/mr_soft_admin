import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';
// import './myinfo.css'

export function AllCourses() {
  const { setPageTitle } = useContext(AppContext)
  
  useEffect(() => {
    setPageTitle('COURSES')
    return () => {
    };
  }, [ setPageTitle ]);
   
      return <>

        <div className="myheader">
            <h2>All Courses</h2>
        </div>
      
      
      </>
}