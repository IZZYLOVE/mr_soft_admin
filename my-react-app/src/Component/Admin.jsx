import { Routes, Route } from "react-router-dom";
import { Admindashboard } from "../components/Admin/Admindashboard";
// import { AdminNavbar } from "../components/Admin/AdminNavbar";
import './main.css'


export function Admin() {
    return <div className="main">
        <Routes>
        {/* <Route path="/" element={<AdminNavbar/>} /> */}
        <Route path="/*" element={<Admindashboard/>} />
        </Routes>   
        </div>
            
}