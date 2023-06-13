import { Route, Routes} from 'react-router-dom';
import './userdashboard.css';
import { Usernavbar } from './Usernavbar';
import { UserProfile } from './UserProfile';
import { News } from './News';
import { UserCourses } from './UserCourses';
import { AddCourse } from './AddCourse';
import { UserProfileUpdate } from './UserProfileUpdate';
import { ChangeProfileImage } from '../General/Userimg';
import { UserSupport } from './UserSupport';
import { AppContext } from '../../Context/App_Context';
import { useContext, useEffect } from 'react';




export function Userdashboard({ formData }) {  
  const { API_base_url, StoredUserObj, getStoredToken } = useContext(AppContext)




  
  useEffect(() => {
    let url = `${API_base_url}api/v1/users/myprofile`
    const fetchData = async (url) => {
      await fetch(url , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${getStoredToken()}`,
        },
        // body: JSON.stringify(formData),
      })
      .then(res => {
        if(!res.ok){
          throw Error('could not fetch the data for that resource')
        }
        return res.json();
      })
      .then(data => {
        // console.log('data.data')
        // console.log(data.data)
        StoredUserObj(data.data)
      })
    }
  fetchData(url)

    return () => {
    };
  }, [ API_base_url, StoredUserObj, getStoredToken ]); // adding handleGetStatsData to dependency array results in an infinit loop, neglect the warning



  return (
      <> 
      <Usernavbar />
      <Routes>
      <Route path="/userprofile" element={<UserProfile/>} />
      <Route path="/usercourses" element={<UserCourses/>} />
      <Route path="/addcourse" element={<AddCourse/>} />
      <Route path="/updateprofile" element={<UserProfileUpdate/>} />
      <Route path="/userchangeprofileimage" element={<ChangeProfileImage/>} />
      <Route path="/usersupport" element={<UserSupport/>} />
      <Route path="/*" element={<News/>} />
      </Routes>
      
    
    
     </>
  
  );
}