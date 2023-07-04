import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import React, { useContext, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { AppContext } from '../Context/App_Context';


export function Login() {
  // let back = <Icon icon="ep:back" className='usernavicon' width='30'/>


  const { API_base_url, handleAlreadyLoggedIn, StoreToken, StoreUserObj} = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  ///
  useEffect(() => {
    let path = handleAlreadyLoggedIn()
    path && navigate(`/${path}`)
    return () => {
    };
  }, [ API_base_url, handleAlreadyLoggedIn, navigate]);
  ///

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_base_url}api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        data.token && StoreToken(data.token) 
        data.data && StoreUserObj(data.data)
        if(data.data.role === 'admin'){
          navigate(`/Admin`)
        }
        else{
          navigate(`/User`)
        }
      } else {
        throw Error(`${data.message}`)
      }

    } catch (error) {
      console.error('Error during login:', error);
      setError(`${error}...`);
    }

    setIsLoading(false);
  };

  return (
    <div className='body'>
      <div className='wrapper'>
        <Link to='/'>
          <Icon icon="ep:back" id='loginicon' width='20px' />
        </Link>
        <div className='form'>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className='input-box'>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label>Email</label>
            </div>

            <div className='input-box'>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label>Password</label>
            </div>

            <div className='remember'>
              <label>
                <input type='checkbox' />
                Remember me
              </label>
              <Link to='/forgotpassword'>Forgot password</Link>
            </div>

            {error && <div className='error-message'>{error}</div>}

            <button type='submit' className='butn' disabled={isLoading} required>
              {isLoading ? (
                <BeatLoader color='#ffffff' loading={isLoading} size={8} />
              ) : (
                'Submit'
              )}
            </button>

            <div className='no-account'>
              Don't have an account? <Link to='/register'>Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
