import React, { useContext, useState, useEffect } from 'react';
// import { Usersidebar } from '../Usersidebar';
import './userimg.css'
import { AppContext } from '../../Context/App_Context';
         

export function ChangeProfileImage() {
  const { API_base_url, setPageTitle, getStoredToken } = useContext(AppContext)
  
  useEffect(() => {
    setPageTitle('CHANGE PROFILE IMAGE')
    return () => {
    };
  }, [ setPageTitle ]);
  

  const [selectedImage, setSelectedImage] = useState(null);

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

        // let headerObj = {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'authorization': `Bearer ${getStoredToken()}`,
        //   },
        //   // body: JSON.stringify(formData),
        // }

        console.log('formData')
        console.log(formData)
        const response = await fetch(`${API_base_url}api/v1/files/linkprofileimage`, {
          method: 'PATCH',
          authorization: `Bearer ${getStoredToken()}`,
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
