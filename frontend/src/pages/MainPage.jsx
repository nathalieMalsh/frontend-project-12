import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import routes from '../routes'
import { loadChannels } from '../slices/channelsSlice.jsx'
import Chat from '../components/Chat.jsx'
import Header from '../components/Header.jsx'

const MainPage = () => {
  console.log('отрисовка MainPage')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userId } = useSelector((state) => state.auth)
  const token = userId?.token
  console.log('Main Page, token', token)

  useEffect(() => {
    if (!userId) {
      navigate('/login')
    }

    const fetchData = async () => {
      try {
        const responce = await axios.get(routes.channelsPath(), { headers: { Authorization: `Bearer ${token}`, } })
        const channels = responce.data // [{id: '1', name: 'general', removable: false}, {id: '2', name: 'random', removable: false}]
        dispatch(loadChannels(channels))
      }
      catch (error) {
        if (error.status === 401) {
          navigate('/login')
        }
        console.log(error.message)
      }
    }
    fetchData()

  }, [dispatch, navigate, token, userId])

  return (
    <div className='h-100 d-flex flex-column'>
      <Header />
      <Container className='h-100 my-4 overflow-hidden rounded shadow flex-fill'>
        <Row className='h-100 bg-white flex-md-row'>
          <Chat />
        </Row>
      </Container>
    </div>
  )
}

export default MainPage;