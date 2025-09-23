import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import MainPage from './pages/MainPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUp from './pages/SignUpPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

const App = () => {
  console.log('отрисовка App')
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
