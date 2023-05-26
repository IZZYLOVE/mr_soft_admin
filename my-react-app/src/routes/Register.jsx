import './register.css'

export function Register() {
    return <div className='regbody'>
     <div class="regwrapper">
        <div class="regform">
            <h2>Register User</h2>
      <form>

      <div class="input-box">
            <input type="text" name="First-name" required />  
            <label>First-name*</label>   
       </div>

       <div class="input-box">
            <input type="text" name="Last-name" required />  
            <label>Last-name*</label>   
       </div>

        <div class="input-box">
            <input type="text" name="name" required />  
            <label>Username*</label>   
        </div>

        <div class="input-box">
            <input type="email" name="email" required />  
            <label>Email*</label>   
        </div>

        <div class="input-box">
            <input type="password" name="password" required />  
            <label>Password*</label>   
        </div>

        <div class="remember">
            <label></label>
           
        </div>

        <button type="submit" class="butn">Register
        </button>

        
            </form>
        </div>
    </div>
    
    </div>
}