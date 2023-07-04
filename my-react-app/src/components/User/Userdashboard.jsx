import { Route, Routes, useNavigate } from 'react-router-dom';
import './userdashboard.css';
import { Usernavbar } from './Usernavbar';
import { UserProfile } from './UserProfile';
import { Feeds } from './Feeds';
import { UserCourses } from './UserCourses';
import { AddCourse } from './AddCourse';
import { UserProfileUpdate } from './UserProfileUpdate';
import { ChangeProfileImage } from '../General/Userimg';
import { UserSupport } from './UserSupport';
import { AppContext } from '../../Context/App_Context';
import { useContext, useEffect } from 'react';




export function Userdashboard({ formData }) {  
  const { API_base_url, isLoggedIn, StoreUserObj, getStoredToken } = useContext(AppContext)
  const navigate = useNavigate();


  useEffect(() => {
    const handleIsLoggedIn = () => {
      console.log('handleIsLoggedIn ran')
      if(isLoggedIn() === false){
        navigate(`/`)
      }
      return(true)
    };
    handleIsLoggedIn()
    return () => {
    };
  }, [ isLoggedIn, navigate ]);


  
  useEffect(() => {
    let url = `${API_base_url}api/v1/users/myprofile`
    const fetchData = async (url) => {
      try {
        const response = await fetch(url , {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${getStoredToken()}`,
          },
          // body: JSON.stringify(formData),
        })
        const data = await response.json();
        if(data.status === 'success'){
          data.data && StoreUserObj(data.data)
        }
        else{
          throw Error('could not fetch the data for that resource, '+data.message)
        }
        
      } catch (error) {
        // Handle any errors
        alert(error)
        console.error('Request failed:', error);
      }
    }
    isLoggedIn() && fetchData(url)

    return () => {
    };
  }, [ API_base_url, StoreUserObj, getStoredToken, isLoggedIn ]); // adding handleGetStatsData to dependency array results in an infinit loop, neglect the warning



  return (
      <> 
      <Usernavbar />
      <Routes>
      <Route path="/userprofile" element={<UserProfile/>} />
      <Route path="/usercourses" element={<UserCourses/>} />
      <Route path="/addcourse" element={<AddCourse/>} />
      <Route path="/profileupdate" element={<UserProfileUpdate/>} />
      <Route path="/changeprofileimage" element={<ChangeProfileImage/>} />
      <Route path="/usersupport" element={<UserSupport/>} />
      <Route path="/*" element={<Feeds/>} />
      </Routes>
      
    
    
     </>
  
  );
}
