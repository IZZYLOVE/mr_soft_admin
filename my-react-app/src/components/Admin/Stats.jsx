import { useContext,  useEffect } from 'react';
import { AppContext } from "../../Context/App_Context"
import {Card} from "../Card"



export function Stats() {
    const { setPageTitle } = useContext(AppContext)
    useEffect(() => {
        setPageTitle('STATS')
        return () => {
        };
      }, [ setPageTitle ]); 
    
   
    return <>
    <Card title="Project1" text="#"/>
</>
}