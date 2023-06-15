import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/App_Context';
import { Icon } from '@iconify/react';
import './profileinfo.css';

export function ProfileInfo() {
  const { setPageTitle, getStoredUserObj } = useContext(AppContext);

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
		<div class="main_flex_container padme">
				<div class="sonx son1x">
        <Icon icon="mdi:user-circle" width="320" alt="Icon" className="profileimg" />
        </div>
				<div class="sonx son2x" id='Overideflexdirection1'>
            <p ><b>Name:</b>  <span>{`${getStoredUserObj().firstName.toUpperCase()} ${getStoredUserObj().middleName.toUpperCase()} ${getStoredUserObj().lastName.toUpperCase()}`}</span></p>
            <p><b>Role:</b>  <span>{`${getStoredUserObj().role.toUpperCase()}`}</span></p>
            <p><b>Email:</b> <span>{`${getStoredUserObj().email.toUpperCase()}`}</span></p>
            <p><b>Phone:</b> <span>{`${getStoredUserObj().phone.toUpperCase()}`}</span></p>
        </div>
				<div class="sonx son3x" id='Overideflexdirection2'>
        <p><b>Adress:</b> <span>{`${address.toUpperCase()}`}</span></p>
        </div>
		</div>
		</div>
    
	</div>
  );
}
