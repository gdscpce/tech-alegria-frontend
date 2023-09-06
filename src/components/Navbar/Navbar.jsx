import React from 'react'
import { gdscLogo,techAlegria } from '../../assets/images/index';
import "./navbar.scss";

export default function Navbar() {
  return (  
    <div className='navbar'>
        <a href="/"><img src={gdscLogo} alt='GDSC Logo' /></a>
        <a href="/"><img src={techAlegria} alt='Tech Alegria Logo' /></a>
    </div>
  )
}
