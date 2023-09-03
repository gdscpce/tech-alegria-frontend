import React from 'react'
import { gdscLogo } from '../../assets/images'
import './navbar.scss'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='tag'>
        <img src={gdscLogo} alt="glogo" />
        <p>GDSC-PCE</p>
        </div>
        <button className='register'>REGISTER</button>
    </div>
  )
}

export default Navbar
