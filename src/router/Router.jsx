import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Landing from '../components/Landing/Landing';
import { Route, Routes } from 'react-router-dom';
import Auth from '../components/Auth/Auth';

export default function Router() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/auth' element={<Auth />} />
      {/* <Route path='*' element={<Landing />} /> */}
    </Routes>
    </>
  )
}