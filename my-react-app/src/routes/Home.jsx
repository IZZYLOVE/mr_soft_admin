import'./home.css'
import {Link} from "react-router-dom"

export function Home() {
    return <>
    <div className="Home">
        <div className='Header'>
            <h6>Welcome</h6> 
            <h2>TO MRSOFT INTL</h2>
            <div className='link'><Link to="login">Login</Link></div>
        </div>
    </div>
    </>
}