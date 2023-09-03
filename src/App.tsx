import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';

function App() {
  return (
    <>
      <Navbar/>
    <div className='container'>
      <Home />
    </div>
    </>
  );
}

export default App;
