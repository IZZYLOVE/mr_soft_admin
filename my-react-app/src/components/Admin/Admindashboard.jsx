import React from "react"
import { AdminNavbar } from "./AdminNavbar";
import {Route, Routes} from "react-router-dom";
import { Myinfo } from "./Myinfo";
import { Stats } from "./Stats";
export function Admindashboard() {



    return (
        <>
          <AdminNavbar />
          <Routes>
          <Route path="/" element={<Stats/>} />
          <Route path="/stats" element={<Stats/>} />
          <Route path="/myinfo" element={<Myinfo/>} />
          </Routes>
        </>
     
      )
    };