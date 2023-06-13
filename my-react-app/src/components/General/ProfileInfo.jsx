import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';

export function ProfileInfo() {
    const { setPageTitle } = useContext(AppContext)
    
    useEffect(() => {
        setPageTitle('PROFILE INFO')
        return () => {
        };
      }, [ setPageTitle ]);

    return (
        <div className="myheader">
            <h2>USER/ADMIN PROFILE</h2>
        </div>
    )
}