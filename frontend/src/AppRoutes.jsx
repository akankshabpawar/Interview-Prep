import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './features/auth/pages/Login.jsx';
import Register from './features/auth/pages/Register.jsx';
import Protected from './features/auth/components/Protected.jsx'
import Home from './features/ai/pages/Home.jsx';
import Report from './features/ai/pages/Report.jsx';
import Layout from './layout/Layout.jsx';
// import Loading from './layout/Loading.jsx';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Protected></Protected>}/>
        <Route path='/home' element={<Protected><Layout><Home/></Layout></Protected>}/>
        <Route path='/login' element={<Layout><Login/></Layout>}/>
        <Route path='/register' element={<Layout><Register/></Layout>}/>
        <Route path='/report/:interviewId' element={<Protected><Layout><Report/></Layout></Protected>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
