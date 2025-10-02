import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainPage from './pages/MainPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUp from './pages/SignUpPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import TestError from './components/TestError.jsx'

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <TestError />
      <ToastContainer position='top-right' autoClose={5000}/>
    </BrowserRouter>
  )
}

export default App
