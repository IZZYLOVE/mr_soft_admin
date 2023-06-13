import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './routes/Home';
import { Login } from './routes/Login';
import { Register } from './routes/Register';
import { Footer } from './routes/Footer';
import { AppContextProvider } from './Context/App_Context';
import { Admin } from './BranchComponent/Admin';
import { User } from './BranchComponent/User';




function App() {
  return (
    <AppContextProvider >
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
    </AppContextProvider >
  )
}

export default App;