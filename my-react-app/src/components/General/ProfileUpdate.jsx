import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';

export function ProfileUpdate() {
    const { setPageTitle } = useContext(AppContext)
    
    useEffect(() => {
        setPageTitle('PROFILE UPDATE')
        return () => {
        };
      }, [ setPageTitle ]);

    return (
        <div className="myheader">
            <h2>USER/ADMIN PROFILE UPDATE</h2>
        </div>
    )
}