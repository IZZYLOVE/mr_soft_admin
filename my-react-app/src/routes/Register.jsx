import './register.css'
import React, { useState } from 'react';

const Rooturl =  'http://127.0.0.1:7300/'

export function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName:'',
        lastName:'',
        email: '',
        phone: '',
        password:'',
        confirmPassword:'',
      });

      const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        let fdx = JSON.stringify(formData)
        console.log(fdx)
        fetch(`${Rooturl}api/v1/users/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
          
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the response from the backend if needed
            console.log(data)
          })
          .catch((error) => {
            // Handle any errors
          });
      };



    return <div className='regbody'>
     <div class="regwrapper">
        <div class="regform">
            <h2>Register</h2>
      <form onSubmit={handleSubmit}>

<div className='firstrow'>

      <div class="input-box">
            <input type="text" 
            name="firstName" 
            value={formData.firstname}
            onChange={handleChange}   
            required />  
            <label>First-name*</label>
           
       </div>
        
       <div class="input-box">
            <input type="text" 
            name="middleName" 
            value={formData.middlename}
            onChange={handleChange}   
            required />  
            <label>Middlename-name*</label>   
       </div>

       <div class="input-box">
            <input type="text" 
            name="lastName" 
            value={formData.lastname}
            onChange={handleChange}   
            required />  
            <label>Last-name*</label>   
       </div>
</div>

<div className='secondrow'>  
        <div class="input-box">
            <input type="text" 
            name="email"
            value={formData.email}
            onChange={handleChange}    
            required />  
            <label>Email*</label>   
        </div>

        <div class="input-box">
            <input type="number" 
            name="phone" 
            value={formData.phone}
            onChange={handleChange}   
            required />  
            <label>Phone*</label>
        </div>

</div> 

<div className='thirdrow'>
        <div class="input-box">
            <input type="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange}   
            required />  
            <label>Password*</label>   
        </div>

        <div class="input-box">
            <input type="password" 
            name="confirmPassword" 
            value={formData.confirmpassword}
            onChange={handleChange}   
            required />  
            <label>Confirm-password*</label>   
       </div>
</div> 
        <div class="remember">
            <label></label>
           
        </div>

        <button type="submit" class="butn" required>Register
        </button>

        
            </form>
        </div>
    </div>
    
    </div>
}