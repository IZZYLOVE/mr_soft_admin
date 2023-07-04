import './register.css'
import React, { useState, useContext} from 'react';
import { BeatLoader } from 'react-spinners';
import { AppContext } from '../Context/App_Context';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';



export function Register() {
  const { API_base_url, StoreToken, StoreUserObj} = useContext(AppContext)

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
    address: ''
  });

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value });
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
      const response = await fetch(`${API_base_url}api/v1/users/signup`, {
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
      data.token && StoreToken(data.token) 
      data.data && StoreUserObj(data.data)

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
        <Link to='/'>
          <Icon icon="ep:back" id='loginicon' width='20px' />
        </Link>
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

            <div className='input-box'>
              <textarea
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                  // cols="50"
                  required
                  ></textarea>
              <label>Address*</label>
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
