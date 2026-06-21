import { useState } from 'react'
import {Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import ThemeToggle from './components/ThemeToggle.jsx';

function App() {
  return (
    <div className="w-screen min-h-screen bg-background text-foreground flex flex-col items-center  font-Inter">
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App

