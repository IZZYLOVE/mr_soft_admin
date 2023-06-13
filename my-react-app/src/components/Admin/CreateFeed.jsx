import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';
// import './myinfo.css'

export function CreateFeed() {
  const { setPageTitle } = useContext(AppContext)
  
  useEffect(() => {
    setPageTitle('CREATE FEED')
    return () => {
    };
  }, [ setPageTitle ]);

    return <>

      <div className="myheader">
          <h2>ADMIN CREATE FEED</h2>
      </div>
    
    </>
}