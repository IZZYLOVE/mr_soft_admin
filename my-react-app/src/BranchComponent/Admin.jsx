import { Routes, Route } from "react-router-dom";
import { Admindashboard } from "../components/Admin/Admindashboard";
// import { AdminNavbar } from "../components/Admin/AdminNavbar";
import './main.css'


export function Admin() {
    return (
        <main className="main">
            <Routes>
                <Route path="/*" element={<Admindashboard/>} />
            </Routes>   
        </main>
    )
            
}