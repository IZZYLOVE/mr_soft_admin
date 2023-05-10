import './register.css'
import {Link} from "react-router-dom"

export function Register() {
    return <div className='body'>
     <div class="wrapper">
        <div class="form">
            <h2>Register</h2>
            <form>
           
        <div class="input-box">
            <input type="text" name="name" required />  
            <label>Username</label>   
        </div>

        <div class="input-box">
            <input type="email" name="email" required />  
            <label>Email</label>   
        </div>

        <div class="input-box">
            <input type="password" name="password" required />  
            <label>Password</label>   
        </div>

        <div class="remember">
            <label></label>
           
        </div>

        <button type="submit" class="butn">Register
        </button>

        <div class="no-account">
            Already have an account? <Link to="/login">Login</Link>
        </div>
        
            </form>
        </div>
    </div>
    
    </div>
}