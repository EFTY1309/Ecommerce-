import React from 'react'
import "./Navbar.css"
import navlogo from "../../assets/nav-logo.svg"
import navProfile from "../../assets/nav-profile.svg"

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="navlogo" className="nav-logo" />
      <img src={navProfile} alt="navprofile" className="navProfile" />
    </div>
  )
}

export default Navbar

