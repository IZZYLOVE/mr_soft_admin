import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './routes/Home';
import { Login } from './routes/Login';
import { Register } from './routes/Register';
import { Admindashboard } from './routes/Adminroutes/Admindashboard';
import { Myinfo } from './routes/Adminroutes/Myinfo';
import { Adminsidebar } from './routes/Adminsidebar';
import { Footer } from './routes/Footer';
import { Users } from './routes/Adminroutes/Users';
import { Usersidebar } from './routes/Usersidebar';
import { Userdashboard } from './routes/Usersroutes/Userdashboard';
import { Userinfo } from './routes/Usersroutes/Userinfo';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="admindashboard" element={<Admindashboard />} />
    <Route path="myinfo" element={<Myinfo />} />
    <Route path="users" element={<Users />} />
    <Route path="adminsidebar" element={<Adminsidebar />} />
    <Route path="usersidebar" element={<Usersidebar />} />
    <Route path="userdashboard" element={<Userdashboard />} />
    <Route path="userinfo" element={<Userinfo />} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App;