import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';

export function AddCourse() {
    const { setPageTitle } = useContext(AppContext)
    
    useEffect(() => {
        setPageTitle('ADD COURSE')
        return () => {
        };
      }, [ setPageTitle ]);

    return (
        <div className="myheader">
            <h2>ADD COURSE</h2>
        </div>
    )
}