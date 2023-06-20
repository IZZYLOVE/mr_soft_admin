import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom"
import './profileinfo.css';

export function ProfileInfo() {
  const { setPageTitle, getStoredUserObj,  profileImage, } = useContext(AppContext);


  let userImage = <Icon icon="mdi:user-circle" width="320" alt="Icon" className="profileimg" />
      if(profileImage() !== undefined){
      userImage = <img className='userprofileImg' src={profileImage()} alt="Profile pixels" />
    }

  useEffect(() => {
    setPageTitle('PROFILE INFO');
    return () => {};
  }, [setPageTitle]);


  let address = getStoredUserObj().address

  if(!address){
    address = "PLEASE UPDATE YOUR PROFILE WITH AN ADDRESS"
  }



  return (
    <div className="myheader">

		<div class="just_a_container">
		<div class="main_flex_container ">
      
        <div class=" son3x myspans" id='Overideflexdirection1ToRow'>
              <span  title='Change profie image'>
                <Link to="../changeprofileimage"><Icon icon="radix-icons:image" className='profileicon' width='20'/></Link>
              </span>
              <span title='Edit profile'> 
                <Link to="../profileupdate"><Icon icon="tabler:edit" className='profileicon' width='20'/></Link>            
              </span>
        </div>
				<div class="sonx son1x">
            <div> 
            { userImage } 
            </div>
        </div>
				<div class="sonx son2x" id='Overideflexdirection1Tocol'>
            <p ><b>Name:</b>  <span>{`${getStoredUserObj().firstName.toUpperCase()} ${getStoredUserObj().middleName.toUpperCase()} ${getStoredUserObj().lastName.toUpperCase()}`}</span></p>
            <p><b>Role:</b>  <span>{`${getStoredUserObj().role.toUpperCase()}`}</span></p>
            <p><b>Email:</b> <span>{`${getStoredUserObj().email.toUpperCase()}`}</span></p>
            <p><b>Phone:</b> <span>{`${getStoredUserObj().phone.toUpperCase()}`}</span></p>
        </div>
				<div class="sonx son3x" id='Overideflexdirection2Tocol'>
        <p><b>Adress:</b> <span>{`${address.toUpperCase()}`}</span></p>
        </div>
		</div>
		</div>
    
	</div>
  );
}
