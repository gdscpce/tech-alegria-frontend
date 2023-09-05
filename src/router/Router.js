import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Landing from '../components/Landing/Landing';
import { Route, Routes } from 'react-router-dom';

export default function Router() {
  return (
    <>
    <Navbar />
    <div className='wrapper'>
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='*' element={<Landing />} />
        </Routes>
    </div>
    </>
  )
}