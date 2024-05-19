import { useState } from 'react'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import ProtectedRoutes from './Pages/ProtectRoutes/ProtectedRoutes'

function App() {

  return (
    <>
       <ToastContainer style={{ zIndex: 999 }} />
     <BrowserRouter>
   <Routes>
    <Route path="/" element={<LandingPage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route element={<ProtectedRoutes/>} >
    <Route path='/home' element={<  HomePage/>}/>
      </Route>    
   </Routes>
   </BrowserRouter>

    </>
  )
}

export default App
