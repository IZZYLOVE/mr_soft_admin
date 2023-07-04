import { useState, useContext } from 'react';
import { Usersidebar } from './Usersidebar';
import { Icon } from '@iconify/react';
import { AppContext } from '../../Context/App_Context';
import { useNavigate } from 'react-router-dom';

export function Usernavbar() {
    // const { getStoredUserObj, profileImage, pageTitle } = useContext(AppContext)
    const { profileImage, pageTitle } = useContext(AppContext)

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleProfileImgRedirect = () => {
    navigate(`./userprofile`)
  }

  const handleBackPathRedirect = () => { 
      navigate(`./`)
  }
  
  // let NavTitile = `${getStoredUserObj().firstName.toUpperCase()} ${getStoredUserObj().middleName.toUpperCase()} ${getStoredUserObj().lastName.toUpperCase()}`
  let NavTitile = pageTitle

  let back = <Icon icon="ep:back" className='usernavicon' width='30'/>

  let userImage = <Icon icon="mdi:user-circle" className='usernavicon' width='30'/>
  if(profileImage() !== undefined){
    userImage = <img className='navBarImg' src={profileImage()} alt="Profile pixels" />
  }


return (<>
  <Usersidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
  <header className='usernavHeader'>
     
    <li onClick={toggleSidebar} className='toggle'>
        <Icon icon="ic:outline-legend-toggle" width='30' className=' navicon' />
    </li>


    <li className='toggle'>
        { NavTitile }
    </li>
    

    <li className='toggle'>
        <span onClick={handleBackPathRedirect} className='gobackpad' title='Go back to previous page'>
            { back }
        </span>
        <span onClick={handleProfileImgRedirect} >
            { userImage }
        </span>
    </li>

</header>
</>)
}
