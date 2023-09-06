import React, { useState } from 'react';
import "./auth.scss";
import axios from "axios";

export default function Auth() {
  const [isLogin, setStatus] = useState(true);
  const isValidated = false;
  const [formData, setFormData] = useState({
    "name": "",
    "email":"",
    "clgname": "",
    "password": "",
  })

  function updateForm(value) {
    return setFormData((v) => {
        return {...v, ...value};
    })
}

  async function loginUser(e) {
    e.preventDefault();
    let email = formData.email;
    let password = formData.password;
    axios.post("http://localhost:4000/api/v1/login", {
      email,
      password
    },{
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log("ERROR", err);
      return
    });
  }

  async function signupUser(e) {
    let name = formData.name;
    let email = formData.email;
    let collegeName = formData.clgname;
    let password = formData.password;
    e.preventDefault();
    axios.post("http://localhost:4000/api/v1/signup", {
      name,
      email,
      collegeName,
      password
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log("ERROR", err);
      return
    });
  }
  
  return (
    <div className='auth'>
      <div className='auth__title'>&lt;{isLogin ? 'LOGIN' : 'REGISTER'} /&gt;</div>
      {
        !isLogin ?
          <form onSubmit={signupUser} className='auth__user'>
            <label>
              <div className='h3'>Full Name</div>
              <input id="name" type="text" onChange={(e) => updateForm({name: e.target.value})}/>
              <small className='error'>*Full Name is Required</small>
            </label>
            <label>
              <div className='h3'>College Name</div>
              <input id="clgname" type="text" onChange={(e) => updateForm({clgname: e.target.value})}/>
              <small className='error'>*College Name is Required</small>
            </label>
            <label>
              <div className='h3'>E-Mail</div>
              <input id="email" type="email" onChange={(e) => updateForm({email: e.target.value})}/>
              <small className='error'>*E-mail is Required</small>
            </label>
            <label>
              <div className='h3'>Password</div>
              <input id="pass" type="password" onChange={(e) => updateForm({password: e.target.value})}/>
              <small className='error'>*Password is Required</small>
            </label>
            <input className='btn btn-submit' type="submit" value="Let's get going" disabled={isValidated} />
          </form>
                :
          <form className="auth__user" onSubmit={loginUser}>
            <label>
              <div className="h3">E-mail</div>
              <input id="email" type="email" onChange={(e) => updateForm({email: e.target.value})}/>
              <small className='error'>*E-mail is Required</small>
            </label>
            <label>
              <div className="h3">Password</div>
              <input id="pass" type="password" onChange={(e) => updateForm({password: e.target.value})}/>
              <small className='error'>*Password is Required</small>
            </label>
            <input className='btn btn-submit' type="submit" value="Let's get going" disabled={isValidated} />
          </form>
      }
      {isLogin ? 
        <button onClick={() => setStatus(false)} className="btn auth__toggle">New User? Register</button> 
        :       
        <button onClick={() => setStatus(true)} className="btn auth__toggle">Already User? Login</button>}
    </div>
  )
}
