import React, { useState } from 'react';
import Books from './Books';
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import Registration from './Registration';
import Navbar from './Navbar';

function App() {
  return (
    <>
    <Navbar />
     
      <Routes>
      <Route path='/registration' element={<Registration />}/>
      <Route path='/' element={<Books />}/>
      
    </Routes>
    </>
  );
}
export default App