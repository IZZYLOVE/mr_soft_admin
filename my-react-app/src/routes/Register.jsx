import './register.css'
import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { useNavigate }  from 'react-router-dom';

const Rooturl = 'http://127.0.0.1:7300/';

export function Register() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '', 
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    // Perform basic form validation
    const { firstName, lastName, email, phone, password, confirmPassword, gender } = formData;
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !gender) {
      alert('Please fill in all required fields.');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${Rooturl}api/v1/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      console.log(data.token);
      // Handle the response from the backend if needed
      localStorage.setItem(`${Rooturl}token`, data.token)
      localStorage.setItem(`${Rooturl}User.serialized`, JSON.stringify(data.data))

      alert('Registration successful, you have been successfully logged in and will be redirected to your dashboard');

      if(data.data.role === 'admin'){
        navigate(`/Admin`)
      }
      else{
        navigate(`/User`)
      }

    } catch (error) {
      // Handle any errors
      console.error('Registration failed:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className='regbody'>
      <div className='regwrapper'>
        <div className='regform'>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className='firstrow'>
              <div className='input-box'>
                <input
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <label>First-name*</label>
              </div>

              <div className='input-box'>
                <input
                  type='text'
                  name='middleName'
                  value={formData.middleName}
                  onChange={handleChange}
                  required
                />
                <label>Middlename-name*</label>
              </div>

              <div className='input-box'>
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <label>Last-name*</label>
              </div>
            </div>

            <div className='secondrow'>
              <div className='input-box'>
                <input
                  type='text'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label>Email*</label>
              </div>

              <div className='input-box'>
                <input
                  type='number'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <label>Phone*</label>
              </div>
            </div>

            <div className='thirdrow'>
              <div className='input-box'>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label>Password*</label>
              </div>

              <div className='input-box'>
                <input
                  type='password'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <label>Confirm-password*</label>
              </div>
            </div>

            <div className='select-input-box'>
              <select
                name='gender'
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value=''>Select Gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
            </div>

            <button type='submit' className='butn' disabled={isLoading} required>
              {isLoading ? (
                <BeatLoader color='#ffffff' loading={isLoading} size={8} />
              ) : (
                'Submit'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
