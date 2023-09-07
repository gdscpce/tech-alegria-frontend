import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Landing from '../components/Landing/Landing';
import { Route, Routes, Navigate } from 'react-router-dom';
import Auth from '../components/Auth/Auth';
import Footer from '../components/Footer/Footer';
import ProblemList from '../components/ProblemList/ProblemList';
import Leaderboard from '../components/Leaderboards/Leaderboards';
import { User } from '../constants/userObject';

export default function Router() {
  const isLoggedIn = User._id;
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