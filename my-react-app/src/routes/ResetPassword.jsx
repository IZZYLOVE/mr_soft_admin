import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import React, { useContext, useRef, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { AppContext } from '../Context/App_Context';


export function ResetPassword() {

  const { API_base_url } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false);
  let resetToken = useRef('null')
  const [formData, setFormData] = useState({
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const HandleParams = () => {
    let params = (new URL(document.location)).searchParams;
    resetToken.current = params.get('resetToken');
  }
  HandleParams()

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
      const response = await fetch(`${API_base_url}api/v1/users/resetpassword/${resetToken.current}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if(data.status === 'success'){
        alert(`Your passward reset was successfull`)
        navigate(`/`)
      }
      else{
        alert(`Your passward reset attempt failed`)
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
          <Icon icon="ep:back" id='loginicon' width='20px' />
        </Link>
        <div className='form'>
          <h2>Reset password</h2>
          <form onSubmit={handleSubmit}>

            <div className='input-box'>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label>New Password</label>
            </div>

            {error && <div className='error-message'>{error}</div>}

            <button type='submit' className='butn' disabled={isLoading} required>
              {isLoading ? (
                <BeatLoader color='#ffffff' loading={isLoading} size={8} />
              ) : (
                'Save Change'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
