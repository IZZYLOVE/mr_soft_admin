import React, { useState } from 'react';
import './forgot.css'

export const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);

  const handleSendVerificationCode = () => {
    fetch('/api/send-verification-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(response => {
        if (response.ok) {
          setStep(2); // Proceed to step 2 if the verification code is sent successfully
        } else {
          throw new Error('Failed to send verification code');
        }
      })
      .catch(error => {
        console.error('Error sending verification code:', error);
      });
  };

  
  const handleVerifyCode = () => {
  fetch('/api/verify-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  })
    .then(response => {
      if (response.ok) {
        setStep(3); // Proceed to step 3 if the code is verified successfully
      } else {
        throw new Error('Failed to verify code');
      }
    })
    .catch(error => {
      console.error('Error verifying code:', error);
    });
};


const handleResetPassword = () => {
    fetch('/api/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code, newPassword }),
    })
      .then(response => {
        if (response.ok) {
          // Reset the component state to the initial values
          setEmail('');
          setCode('');
          setNewPassword('');
          setStep(1);
          alert('Password reset successfully!'); // Show success message
        } else {
          throw new Error('Failed to reset password');
        }
      })
      .catch(error => {
        console.error('Error resetting password:', error);
      });
  };
  

  return (
    <div className="forgot-password-container">
      {step === 1 && (
        <div className="step-one">
          <h2>Step 1: Enter your email</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={() => handleSendVerificationCode()}>Send Code</button>
        </div>
      )}
      {step === 2 && (
        <div className="step-two">
          <h2>Step 2: Enter verification code</h2>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={() => handleVerifyCode()}>Verify Code</button>
        </div>
      )}
      {step === 3 && (
        <div className="step-three">
          <h2>Step 3: Reset your password</h2>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={() => handleResetPassword()}>Reset Password</button>
        </div>
      )}
    </div>
  );
};
