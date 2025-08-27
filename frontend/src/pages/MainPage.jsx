import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const MainPage = () => {
  const navigate = useNavigate()

  const token = useSelector((state) => state.auth.token)

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