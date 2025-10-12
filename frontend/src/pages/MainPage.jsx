import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import routes from '../routes'
import { loadChannels } from '../store/slices/channelsSlice.jsx'
import Chat from '../components/Chat/Chat.jsx'
import Header from '../components/Header.jsx'

const MainPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { userId } = useSelector(state => state.auth)
  const token = userId?.token

  useEffect(() => {
    if (!userId) {
      navigate('/login')
      return
    }

    const fetchData = async () => {
      try {
        const responce = await axios.get(routes.channelsPath(), { headers: { Authorization: `Bearer ${token}` } })
        const channels = responce.data // [{id: '1', name: 'general', removable: false}, {id: '2', name: 'random', removable: false}]
        dispatch(loadChannels(channels))
      }
      catch (error) {
        if (error.status === 401) {
          navigate('/login')
          console.log(error.message)
          toast.error(t('errors.authError'))
        }
        else {
          console.log(error.message)
          toast.error(t('errors.loadDataError'))
        }
      }
    }
    fetchData()
  }, [dispatch, navigate, token, userId])

  return (
    <div className="h-100 d-flex flex-column">
      <Header />
      <Container className="h-100 my-4 overflow-hidden rounded shadow flex-fill">
        <Row className="h-100 bg-white flex-md-row">
          <Chat />
        </Row>
      </Container>
    </div>
  )
}

export default MainPage
