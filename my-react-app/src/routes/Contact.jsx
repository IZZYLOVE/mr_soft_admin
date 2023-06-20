import './contact.css'
import { useState } from 'react';

export function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();

      setName('');
      setEmail('');
      setMessage('');
    };
    
    return <>
    <div className="container">
        <h1 className='tex'>Contact us</h1>
        <h3 className='tex'>Have any questions? We'd love to hear from you</h3>

        <div className="cards">
            <div className="card1">
           
            <form onSubmit={handleSubmit} className='form-container'>
            <h3>Feedback</h3>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <br />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />

              <label htmlFor="message">Message:</label>
              <br />
              <textarea
                id="message" className='textarea'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                cols="50"
                required
              ></textarea>
              <br />

              <button type="submit">Submit</button>
      </form>
            </div>

            <div className="card2">
                <h3>Contact Information</h3> 
                <div className="con-info">
                   <p><strong>Email:</strong> mrsoft@mail.com</p>
                   <p><strong>Phone:</strong> 123-456-7890</p>
                   <p><strong>Address:</strong> 123 Street, Port-harcourt, Nigeria</p>
                </div>
          </div>
        </div>
    </div>
    
    </>
}