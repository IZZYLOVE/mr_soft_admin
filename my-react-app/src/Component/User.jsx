import { Userdashboard } from "../components/User/Userdashboard"
import { Route, Routes } from "react-router-dom"
import './main.css'


export function User() {
     return (
        <div className="main">
        <Routes>
        <Route path="/" element={<Userdashboard/>} />

        </Routes>   
        </div>
     )
}