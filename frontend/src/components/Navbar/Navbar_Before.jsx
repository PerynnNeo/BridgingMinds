import React from "react"
import logo from '../../assets/logo.png';
import '../../styles/Navbar.css';
const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={logo} alt = ""/>
      <ul className='nav-menu'>
        <li>Home</li>
        <li>About Me</li>
        <li>Translating</li>
        <li>Games</li>
        <li>Settings</li>
      </ul>
      <div className="nar-connect">Profile</div>
    </div>
  )
}

export default Navbar