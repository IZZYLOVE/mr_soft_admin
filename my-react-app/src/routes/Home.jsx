import'./home.css'
import { useContext, useEffect } from "react"
// import { AppContext } from '../Context/App_Context';
import { AppContext } from "../Context/App_Context"
import { useNavigate } from 'react-router-dom';



import {Link} from "react-router-dom"
import { Icon } from '@iconify/react';


export function Home() {
    const { API_base_url, handleAlreadyLoggedIn, isLoggedIn } = useContext(AppContext)
    const navigate = useNavigate();




  useEffect(() => {
    let path = handleAlreadyLoggedIn()
    isLoggedIn() && path && navigate(`/${path}`)
    return () => {
    };
  }, [ API_base_url, handleAlreadyLoggedIn, isLoggedIn, navigate]);
///



    return <>
    <div className="Home">
        <div className='Header'>
            <h6>Welcome</h6> 
            <h2>TO MRSOFT INTL</h2>
            <div className='link'><Link to="login">Login<Icon icon="mdi:user-circle" className='icons'/></Link></div>
            <div className='link2' id='colink'><Link to='Contact' className='conlink'>Contact<Icon icon="tabler:phone" className='icons' id='icons' /></Link></div>
        </div>
    </div>
    </>
}