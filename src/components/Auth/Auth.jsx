import React, { useState } from 'react';
import "./auth.scss";

export default function Auth() {
  const [isLogin, setStatus] = useState(true);
  function authUser() {
    if(isLogin) {

    } else {

    }
  }
  return (
    <div className='auth'>
      <div className='auth__title'>&lt;{isLogin ? 'LOGIN' : 'REGISTER'} /&gt;</div>
      <form onSubmit={authUser} className='auth__login'>
          <label>
            <div className='h3'>Full Name</div>
            <input type="text"/>
          </label>
          <label>
            <div className='h3'>College Name</div>
            <input type="text"/>
          </label>
          <label>
            <div className='h3'>E-Mail</div>
            <input type="mail"/>
          </label>
          <input className='btn btn-submit' type="submit" value="Let's get going" />
      </form>
      {isLogin ? 
        <button onClick={() => setStatus(false)} className="btn auth__toggle">New User? Register</button> 
        :       
        <button onClick={() => setStatus(true)} className="btn auth__toggle">Already User? Login</button>}
    </div>
  )
}
