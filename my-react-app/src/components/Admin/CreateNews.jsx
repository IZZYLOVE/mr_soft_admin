import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';
// import './myinfo.css'

export function CreateNews() {
  const { setPageTitle } = useContext(AppContext)
  
  useEffect(() => {
    setPageTitle('CREATE NEWS')
    return () => {
    };
  }, [ setPageTitle ]);

    return <>

      <div className="myheader">
          <h2>ADMIN CREATES NEWS</h2>
      </div>
    
    </>
}