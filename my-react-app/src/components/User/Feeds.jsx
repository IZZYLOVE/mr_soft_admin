import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';

export function Feeds() {
    const { setPageTitle } = useContext(AppContext)
    
    useEffect(() => {
        setPageTitle('FEEDS')
        return () => {
        };
      }, [ setPageTitle ]);

    return (
        <div className="myheader">
            <h2>FEEDS</h2>
        </div>
    )
}