import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Result from './pages/result'
import { ToastContainer } from 'react-toastify'
import AuthPage from './pages/auth/login'

function App() {
 

  return (
    <>
    <ToastContainer position="top-right" autoClose={2000} />
     <Routes>
        
<Route
          path="/"
          element={
              <Home />
          }
        />
       
    <Route
          path="/login"
          element={
              <AuthPage/>
          }
        />

        <Route
          path="/pathfinder"
          element={
              <Result/>
          }
        />
              </Routes>
    </>
  )
}

export default App
