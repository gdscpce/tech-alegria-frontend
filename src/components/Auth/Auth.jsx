import React, { useState } from 'react';
import "./auth.scss";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { endpoint, setUserObject } from '../../constants/Constants';

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
    let email = formData.email;
    let password = formData.password;
    const toaster = toast.loading('Please Wait...', {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    e.preventDefault();
    axios.post(endpoint + "login", {
      email,
      password
    })
    .then((response) => {
      toast.update(toaster, {render: "Please Wait", type: "default", isLoading: false, autoClose: 1});
      setUserObject(response.data.user);
      toast.update(toaster, {render: "Logging Successful", type: "success", isLoading: false, autoClose: true});
      window.location.href = '/problem-statement';
    })
    .catch((err) => {
      toast.update(toaster, {render: "Error Bad Credentials", type: "error", isLoading: false, autoClose: true});
      console.log("ERROR", err);
      return
    });
  }

  async function signupUser(e) {
    let name = formData.name;
    let email = formData.email;
    let collegeName = formData.clgname;
    let password = formData.password;
    const toaster = toast.loading('Please Wait...', {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    e.preventDefault();
    axios.post(endpoint + "signup", {
      name,
      email,
      collegeName,
      password
    })
    .then((response) => {
      toast.update(toaster, {render: "Successfully Account Created", type: "success", isLoading: false, autoClose: true});
      setStatus(true);
    })
    .catch((err) => {
      if(err.response.status === 503) {
        toast.update(toaster, {render: "User Already Exists", type: "error", isLoading: false, autoClose: true});
      } else if(err.response.status === 500) {
        toast.update(toaster, {render: "Error Creating New User", type: "error", isLoading: false, autoClose: true});
      }
      console.log("ERROR", err);
      return
    });
  }

  
  return (
    <div className='auth'>
      <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="colored"
      />
      <div className='auth__title'>&lt;{isLogin ? 'LOGIN' : 'REGISTER'} /&gt;</div>
      {
        !isLogin ?
          <form onSubmit={signupUser} className='auth__user'>
            <label>
              <div className='h3'>Full Name</div>
              <input id="name" type="text" onChange={(e) => updateForm({name: e.target.value})} />
              <small className='error'>*Full Name is Required</small>
            </label>
            <label>
              <div className='h3'>College Name</div>
              <input id="clgname" type="text" onChange={(e) => updateForm({clgname: e.target.value})} />
              <small className='error'>*College Name is Required</small>
            </label>
            <label>
              <div className='h3'>E-Mail</div>
              <input id="email" type="email" onChange={(e) => updateForm({email: e.target.value})} />
              <small className='error'>*E-mail is Required</small>
            </label>
            <label>
              <div className='h3'>Password</div>
              <input id="pass" type="password" onChange={(e) => updateForm({password: e.target.value})} />
              <small className='error'>*Password is Required</small>
            </label>
            <input className='btn btn-submit' type="submit" value="Let's get going" disabled={isValidated} />
          </form>
                :
          <form className="auth__user" onSubmit={loginUser}>
            <label>
              <div className="h3">E-mail</div>
              <input id="email" type="email" onChange={(e) => updateForm({email: e.target.value})} />
              <small className='error'>*E-mail is Required</small>
            </label>
            <label>
              <div className="h3">Password</div>
              <input id="pass" type="password" onChange={(e) => updateForm({password: e.target.value})} />
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
