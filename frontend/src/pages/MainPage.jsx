import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap'

const MainPage = () => {
  const navigate = useNavigate()

  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  return (
    <Container className='mt-5'>
      <h1>Главная страница</h1>
    </Container>
  )
}

export default MainPage;