import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';

export function News() {
    const { setPageTitle } = useContext(AppContext)
    
    useEffect(() => {
        setPageTitle('NEWS')
        return () => {
        };
      }, [ setPageTitle ]);

    return (
        <div className="myheader">
            <h2>NEWS</h2>
        </div>
    )
}