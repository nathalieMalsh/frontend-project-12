import React from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
  const navigate = useNavigate()

  const token = window.localStorage.getItem('userId')

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  return (
    <div>
      <h1>Главная страница</h1>
    </div>
  )
}

export default MainPage;