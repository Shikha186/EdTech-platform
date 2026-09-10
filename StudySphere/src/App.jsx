import { useState } from 'react'
import {Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import ThemeToggle from './components/ThemeToggle.jsx';
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";

function App() {
  return (
    <div className="w-screen min-h-screen bg-background text-foreground flex flex-col items-center  font-Inter">
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login"element={<Login/>} />
        <Route path="/signUp"element={<SignUp/>} />
        <Route path="/sendOTP"element={<VerifyOTP/>} />
      </Routes>
    </div>
  )
}

export default App

