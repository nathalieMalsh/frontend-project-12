import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap'
import routes from '../routes'

const MainPage = () => {
  const navigate = useNavigate()

  const userId = useSelector((state) => state.auth.userId)
  const token = userId?.token

  useEffect( async () => {
    if (!userId) {
      navigate('/login')
    }

    const fetchData = async () => {
      try {
        const responce = await axios.get(routes.getChannelsPath(), { headers: { Authorization: `Bearer ${token}`, } })
  
        console.log('responce Главная страница', responce.data)
      }
      catch (error) {
        console.log(error.message)
      }
    }
    fetchData()

  }, [])

  return (
    <Container className='mt-5'>
      <h1>Главная страница</h1>
    </Container>
  )
}

export default MainPage;