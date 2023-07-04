import React, { useContext, useState, useEffect } from 'react';
// import { Usersidebar } from '../Usersidebar';
import './userimg.css'
import { AppContext } from '../../Context/App_Context';
import {Link} from "react-router-dom"
import { Icon } from '@iconify/react';
// import Swal from 'sweetalert2';
// import axios from 'axios';


export function ChangeProfileImage() {
  const { API_base_url, setPageTitle, getStoredToken, StoreUserObj } = useContext(AppContext)
  
  useEffect(() => {
    setPageTitle('CHANGE PROFILE IMAGE')
    return () => {
    };
  }, [ setPageTitle ]);
  

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // console.log(event.target.files[0])
    setSelectedImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedImage) {
      try {
        
        const formData = new FormData();
        formData.append('file', selectedImage);
        console.log('formData')
        console.log(formData)

        let headerObj = {
          // method: 'PATCH',
          method: 'PATCH',
          headers: {
          // 'Content-Type': 'application/json',
          // 'Content-Type': 'multipart/form-data',
            'authorization': `Bearer ${getStoredToken()}`
            
          },
          body: formData,
        }
        const response = await fetch(`${API_base_url}api/v1/files/linkprofileimage`, headerObj);
        const data = await response.json();
        if (response.ok) {
          data.data && StoreUserObj(data.data)
          // Swal.fire('UPLOAD SUCCESSFUL');
          alert('UPLOAD SUCCESSFUL');
        } else {
          console.error('Image upload failed');
        }
        
        // axios.post(`${API_base_url}api/v1/files/linkprofileimage`, formData, {'authorization': `Bearer ${getStoredToken()}`} )
        // .then(response => { // then print response status
        //     console.log('Image uploaded successfully');
        //     if (response.ok) {
        //       console.log('Image uploaded successfully');
        //     } else {
        //       console.error('Image upload failed');
        //     }
        // })


      } catch (error) {
        // Handle any error during the upload process
        console.error('Error during image upload:', error);
      }
    }
  };


  return (
    <div className="user-dashboard">

    <div className="just_a_container"> 
		<div className="main_flex_container ">
      
        <div className=" son3x myspans" id='Overideflexdirection1ToRow'>
              <span  title='Change profie image'>
                <Link to="../changeprofileimage"><Icon icon="radix-icons:image" className='profileicon' width='20'/></Link>
              </span>
              <span title='Edit profile'> 
                <Link to="../profileupdate"><Icon icon="tabler:edit" className='profileicon' width='20'/></Link>            
              </span>
        </div>


		</div>
		</div>

    <div className="main_flex_container ">
        <div className="flexedContainer myspans " id='Overideflexdirection1Tocol' >
      <div className='infocontent '>
        <div className="info-container ">
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                name="file"
                onChange={handleImageUpload}
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
      </div>
    </div>
  );
}