import { useContext, useEffect } from 'react';
import './myinfo.css'
import { AppContext } from '../../Context/App_Context';

export function ProfileImage() {
  const { setPageTitle } = useContext(AppContext)
  useEffect(() => {
    setPageTitle('ADMIN PROFILE IMAGE')
    return () => {
    };
  }, [ setPageTitle ]); 
   
      return <>

        <div className="myheader">
            <h2>ADmin Profile Image</h2>
        </div>
      
      
      </>
}