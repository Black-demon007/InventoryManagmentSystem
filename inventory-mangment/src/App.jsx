import React, { useState } from 'react'
import './index.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import QRCodeScanner from './pages/QrScan'
import Edit from './pages/EditPage'
import EditWholeProduct from './pages/EditProduct'
import GenerateQR from './pages/GenerateQr'
import Login from './pages/Login'
import Register from './pages/Registration'
function App() {
  const user = useSelector(state => state.user.currentUser)

  return (
    <div className="">
        <Router>
          <Routes> 
            <Route path='/' element={<Home />} />
            <Route path='/qrscan' element={<QRCodeScanner />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/editproduct/:id' element={<EditWholeProduct />} />
            <Route path='/generateqr' element={<GenerateQR />} />
            <Route path={'signin'}  element={user?<Navigate to='/'/>:<Login/>}/>
            <Route path={'signup'} element={<Register/>}/>
            
          </Routes>
        </Router>
    </div>
  )
}

export default App