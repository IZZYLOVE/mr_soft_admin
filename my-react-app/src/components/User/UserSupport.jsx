import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';

export function UserSupport() {
    const { setPageTitle } = useContext(AppContext)
    
    useEffect(() => {
        setPageTitle('USER SUPPORT')
        return () => {
        };
      }, [ setPageTitle ]);

    return (
        <div className="myheader">
            <h2>User Support</h2>
        </div>
    )
}