import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Landing from '../components/Landing/Landing';
import { Route, Routes, Navigate } from 'react-router-dom';
import Auth from '../components/Auth/Auth';
import Footer from '../components/Footer/Footer';
import ProblemList from '../components/ProblemList/ProblemList';
import Leaderboard from '../components/Leaderboards/Leaderboards';
import { getUserObject } from '../constants/Constants';

export default function Router() {
  const isLoggedIn = getUserObject();
  return (
    <>
    <Navbar />
    <div className="wrapper">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/problem-statement' 
          element={ isLoggedIn ? ( <ProblemList /> ) : (<Navigate replace to={"/auth"} />)}
        />
        <Route path='/leaderboard' element={<Leaderboard />} />
      </Routes>
    </div>
    <Footer />
    </>
  )
}