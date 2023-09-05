import React from 'react'
import { gdscLogo,techAlegria } from '../../assets/images/index';
import "./navbar.scss";

export default function Navbar() {
  return (  
    <div className='navbar'>
        <img src={gdscLogo} alt='GDSC Logo' />
        <img src={techAlegria} alt='Tech Alegria Logo' />
    </div>
  )
}
