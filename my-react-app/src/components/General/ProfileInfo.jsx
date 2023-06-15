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

  return (
    <div className="myheader">
      <div className="profile">
        {/* Icon component */}
        <div className="profilesidebar">
          <Icon icon="mdi:user-circle" width="200" alt="Icon" className="profileimg" />
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
