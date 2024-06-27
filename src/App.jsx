import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';


function App() {
  return (
    <>

    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Signup' element={<Signup />} />
      <Route path='/Profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    </Routes>
    
    </>
  )
}

export default App
