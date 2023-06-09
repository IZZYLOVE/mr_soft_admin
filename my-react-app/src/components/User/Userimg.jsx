import React, { useState } from 'react';
import { Usersidebar } from '../Usersidebar';
import { Icon } from '@iconify/react';
import './userimg.css'
import { Link } from 'react-router-dom';

const Rooturl = 'http://127.0.0.1:7300/';

export function Userimg() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedImage) {
      try {
        const formData = new FormData();
        formData.append('image', selectedImage);

        const response = await fetch(`${Rooturl}api/v1/files/linkprofileimage`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Image uploaded successfully');
        } else {
          console.error('Image upload failed');
        }
      } catch (error) {
        // Handle any error during the upload process
        console.error('Error during image upload:', error);
      }
    }
  };


  return (
    <div className="user-dashboard">
      <Usersidebar isOpen={sidebarOpen} onClose={toggleSidebar} />

      <div className="usernav">
        <div onClick={toggleSidebar} className='toggle'>
          <Icon icon="ic:outline-legend-toggle" width='30' id='navicon' />

          <span className='usernavdetails'>
            <Link to='/userinfo'></Link>
          </span>
        </div>
      </div>

      <div className='infocontent'>
        <div className="info-container">
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                onChange={handleImageUpload}
                name='profileImg'
              />
              <button type="submit">Upload</button>
            </form>
            {selectedImage ? (
              <div>
                <h3>Preview</h3>
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" className='infomainimg' />
              </div>
            ) : (
              <p className='error'>No file selected for upload.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
