import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './features/auth/pages/Login.jsx';
import Register from './features/auth/pages/Register.jsx';
import Protected from './/features/auth/components/Protected.jsx'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Protected><p>asdfghjk</p></Protected>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
