  import { lazy, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './Pages/ProtectRoutes/ProtectedRoutes'
import NotFound from './Pages/NotFound'

import HistoryPage from './Pages/HistoryPage'
import FavouritesPage from './Pages/FavouritesPage'
const HomePage = lazy(() => import('./Pages/HomePage'));
const LoginPage = lazy(() => import('./Pages/LoginPage'));
const LandingPage = lazy(() => import('./Pages/LandingPage'));


function App() {

  return (
    <>
       <ToastContainer style={{ zIndex: 999 }} />
     <BrowserRouter>
   <Routes>
    <Route path="/" element={<LandingPage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path='*' element={<NotFound/>}/>
    <Route element={<ProtectedRoutes/>} >
    <Route path='/home' element={<HomePage/>}/> 
    <Route path='/history' element={<HistoryPage/>}/> 
    <Route path='/favourites' element={<FavouritesPage/>}/> 
      </Route>    
   </Routes>
   </BrowserRouter>

    </>
  )
}

export default App
