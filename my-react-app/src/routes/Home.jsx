import'./home.css'

import {Link} from "react-router-dom"
import { Icon } from '@iconify/react';

export function Home() {
    return <>
    <div className="Home">
        <div className='Header'>
            <h6>Welcome</h6> 
            <h2>TO MRSOFT INTL</h2>
            <div className='link'><Link to="login">Login<Icon icon="mdi:user-circle" className='icons'/></Link></div>
        </div>
    </div>
    </>
}