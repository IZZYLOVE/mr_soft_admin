import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom"
import './profileinfo.css';

export function ProfileInfo() {
  const { setPageTitle, getStoredUserObj,  profileImage, } = useContext(AppContext);


  let userImage = <Icon icon="mdi:user-circle" className='' width='300' alt="Icon"  />
      if(profileImage() !== undefined){
      userImage = <img className='userprofileImg' src={profileImage()} alt="Profile pixels" />
    }

  useEffect(() => {
    setPageTitle('PROFILE INFO');
    return () => {};
  }, [setPageTitle]);


  return (
    <div className="myheader">
       <span id='span'><Link to="../profileupdate">Edit profile<Icon icon="tabler:edit" className='profileicon' width='30'/></Link></span> 
      <div className="profile">
        {/* Icon component */}
        <div className="profilesidebar" >
        { userImage }
        </div>

        {/* Profile information component */}
        <div className="profilemain">
          <p><b>Name:</b>  <span>{`${getStoredUserObj().firstName.toUpperCase()} ${getStoredUserObj().middleName.toUpperCase()} ${getStoredUserObj().lastName.toUpperCase()}`}</span></p>
          <p><b>Role:</b>  <span>{`${getStoredUserObj().role.toUpperCase()}`}</span></p>
          <p><b>Email:</b> <span>{`${getStoredUserObj().email.toUpperCase()}`}</span></p>
          <p><b>Phone:</b> <span>{`${getStoredUserObj().phone.toUpperCase()}`}</span></p>
        </div>
      </div>
    </div>
  );
}
