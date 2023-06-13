import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';
// import './myinfo.css'
import '../General/myinfo.css'
export function CreateCourse() {
  const { setPageTitle } = useContext(AppContext)
  
  useEffect(() => {
    setPageTitle('CREATE COURSE')
    return () => {
    };
  }, [ setPageTitle ]);
   
      return <>

        <div className="myheader">
            <h2>ADMIN CREATE COURSE</h2>
        </div>
      
      
      </>
}