import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './routes/Home';
import { Login } from './routes/Login';
import { Register } from './routes/Register';
import { Footer } from './routes/Footer';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    </Routes>
     <Footer/>
    </BrowserRouter>
  )
}

export default App;
