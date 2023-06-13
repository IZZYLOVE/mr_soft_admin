import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';

export function UserCourses() {
    const { setPageTitle } = useContext(AppContext)
    
    useEffect(() => {
        setPageTitle('USER COURSES')
        return () => {
        };
      }, [ setPageTitle ]);

    return (
        <div className="myheader">
            <h2>USER COURSES</h2>
        </div>
    )
}