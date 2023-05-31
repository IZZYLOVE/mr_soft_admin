import './login.css'
import {Link} from "react-router-dom"
import { Icon } from '@iconify/react';


export function Login() {
    return < div className='body'>
    <div class="wrapper">
    <Link to='/'><Icon icon="#" id='loginicon' width='30px'/>...</Link>
        <div class="form">
            <h2>Login</h2>
            <form action="#">
                
        <div class="input-box">
            <input type="email" name="email" required />  
            <label>Email</label>   
        </div>

        <div class="input-box">
            <input type="password" name="password" required />  
            <label>Password</label>   
        </div>

        <div class="remember">
            <label><input type="checkbox"/>
            Remember me</label>
            <Link to='#'>Forgot password</Link>
        </div>
        <button type="submit" class="butn">Login
        </button>
         <div className='no-account'>Dont have an account? <Link to='/register' className='reglink'>Register</Link></div>
            </form>
        </div>
    </div>
    
    </div>
}