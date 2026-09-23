import { useState } from 'react'
import {Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'

import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import Navbar from './components/common/Navbar.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import UpdatePassword from './pages/UpdatePassword.jsx';
import DashboardLayout from './components/common/Dashboard/DashboardLayout.jsx';
import MyProfile from './pages/MyProfile.jsx';
import EnrolledCourses from './pages/EnrolledCourses.jsx';
import Cart from './pages/Cart.jsx';
import Settings from './pages/Settings.jsx';
import DashboardHome from './pages/DashboardHome.jsx';

import Courses from './pages/Courses.jsx';


function App() {
  return (
    <div className="w-screen min-h-screen bg-background text-foreground flex flex-col items-center  font-Inter">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login"element={<Login/>} />
        <Route path="/signUp"element={<SignUp/>} />
        <Route path="/sendOTP"element={<VerifyOTP/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update_password/:token" element={<UpdatePassword />} />
        <Route path="/courses" element={<Courses/>}/>
        <Route 
            path="/dashboard"
            element={<DashboardLayout />}>
          {/* <Route index element={<MyProfile />}/> */}
          <Route index path="my-profile" element={<MyProfile />}/>
          <Route path="enrolled-courses" element={<EnrolledCourses />}/>
          <Route path="cart" element={<Cart />}/>
          <Route path="settings" element={<Settings />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App

