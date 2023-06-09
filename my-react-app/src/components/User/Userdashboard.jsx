import { Route, Routes} from 'react-router-dom';
import './userdashboard.css';
import { Usernavbar } from './Usernavbar';
import { Userinfo } from './Userinfo';




export function Userdashboard({ formData }) {  

  return (
      <> 
      <Usernavbar />
      <Routes>
      <Route path="/" element={<Userinfo/>} />
      </Routes>
      
    
    
     </>
  
  );
}
