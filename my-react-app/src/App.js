import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './routes/Home';
import { Login } from './routes/Login';
import { Register } from './routes/Register';
import { Admin } from './Component/Admin';
import { User } from './Component/User';
import { Footer } from './routes/Footer';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="admin/*" element={<Admin />} />
    <Route path="user/*" element={<User />} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App;