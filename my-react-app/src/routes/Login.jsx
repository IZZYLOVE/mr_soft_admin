import './login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';

const Rooturl = 'http://127.0.0.1:7300/';

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      console.log(formData)
      const response = await fetch(`${Rooturl}api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Redirect to the landing page
        navigate.push('/userdashboard');
      } else {
        const { error } = await response.json();
        setError(error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Incorrect credentials...');
    }

    setIsLoading(false);
  };

  return (
    <div className='body'>
      <div className='wrapper'>
        <Link to='/'>
          <Icon icon='#' id='loginicon' width='30px' />
          ...
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
              <Link to='#'>Forgot password</Link>
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
