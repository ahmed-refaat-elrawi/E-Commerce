import React from "react";
import Style from "./Layout.module.css"
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import { Offline, Online } from "react-detect-offline";
function Layout() {
    return <>
    
    <Navbar></Navbar>
    <div className="container">

    <Outlet></Outlet>
    </div>
    <div>

    <Offline><div className="network">
        <i className="fas fa-wifi"></i> You are offline!</div></Offline>
  </div>
    <Footer></Footer>
    </> 
    ;
}

export default Layout;