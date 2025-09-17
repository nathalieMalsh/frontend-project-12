import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Col, Button,Form } from 'react-bootstrap'
import { addMessage } from '../slices/messagesSlice'
import routes from '../routes'
import socket from '../socket'
import getModal from '../modals/index.js'

const Chat = () => {
  console.log('отрисовка Chat')
  
  const dispatch = useDispatch()
  
  const channels = useSelector((state) => state.channels.channels)
  
  const userId = useSelector((state) => state.auth.userId)
  const token = userId?.token
  const username = userId?.username
  
  const allMessages = useSelector((state) => state.chat.messages || [])

  // console.log('Chat.jsx channels', channels)
  // console.log('Chat.jsx userId: username, token', username, token)
  // console.log('Chat.jsx allMessages', allMessages)

  const [currentChannelId, setCurrentChannelId] = useState('1')
  const [currentChannelChat, setCurrentChannelChat] = useState([])
  const [inputValue, setInputValue] = useState('')

  const [modalInfo, setModalInfo] = useState({ type: null, item: null })
  
  const showModal = (type, item = null) => setModalInfo({ type, item })
  const hideModal = () => setModalInfo({ type: null, item: null })

  useEffect(() => {
    socket.on('connect', () => console.log('Подключение к серверу'))
    socket.on('disconnect', () => console.log('Подключение потеряно'))

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message))
    })

    return () => {
      socket.off('newMessage')
    }
  }, [dispatch])
  
  useEffect(() => {
    setCurrentChannelChat(allMessages.filter((message) => message.channelId === currentChannelId))
  }, [allMessages, currentChannelId])

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!inputValue.trim()) return

    try {
      const newMessage = { body: inputValue, channelId: currentChannelId, username }
      axios.post(routes.addMessagePath(), newMessage, { headers: { Authorization: `Bearer ${token}`, } })
      setInputValue('')
    }
    catch (error) {
      console.log('Ошибка при отправке сообщения:', error.message)
    }
  }

  const renderModal = ({ modalInfo, hideModal, setCurrentChannelId }) => {
    if (!modalInfo.type) {
      return null
    }
    const Component = getModal(modalInfo.type)
    return <Component modalInfo={modalInfo} onHide={hideModal} setCurrentChannelId={setCurrentChannelId} />
  }

  return (
    <>
      {/* Список каналов */}
      <Col xs={4} md={2} className='border-end px-0 bg-light flex-column h-100 d-flex' /* div 2 */>
        <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
          <b>Каналы</b>
          <Button variant='outline-primary' className='p-0 text-primary btn btn-group-vertical' onClick={() => showModal('adding')}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='20' height='20' fill='currentColor' className='bi bi-plus-square'>
              <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z'/>
              <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4'/>
            </svg>
            <span className='visually-hidden'>+</span>
          </Button>
        </div>
        <ul id='channels-box' className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
          {channels.map((channel) => (
            <li key={channel.id} className='nav-item w-100'>
              <Button
                variant={`${channel.id === currentChannelId ? 'secondary' : 'white'}`}
                type='button'
                className='w-100 rounded-0 text-start'
                onClick={() => setCurrentChannelId(channel.id)}
              >
                <span className='me-1'>#</span>
                {channel.name}
              </Button>
            </li>
          ))}
        </ul>
      </Col>

      {/* Чат справа */}
      <Col className='p-0 h-100' /* div 3 */>
        <div className='d-flex flex-column h-100'>
          <div className='bg-light mb-4 p-3 shadow-sm small'>
            <p className='m-0'>
              <b># {channels.find(c => c.id === currentChannelId)?.name}</b>
            </p>
            <span className='text-muted'>{currentChannelChat.length} сообщений</span>
          </div>

          <div id='messages-box' className='chat-messages overflow-auto px-5'>
            {currentChannelChat.map(({ id, body, username }) => (
              <div key={id} className='text-break mb-2'>
                <b>{username}</b>: {body}
             </div>
            ))
            }
          </div>

          <div className='mt-auto px-5 py-3'>
            <Form className='py-1 border rounded-2' onSubmit={handleSubmit}>
              <div className='input-group has-validation'>
                <Form.Control
                  name='body'
                  type='text'
                  aria-label='Новое сообщение'
                  placeholder='Введите сообщение...'
                  className='border-0 p-0 ps-2 form-control'
                  value={inputValue}
                  onChange={handleChange}
                />
                <Button type='submit' variant='light' className={`btn btn-group-vertical ${inputValue.trim() ? '' : 'disabled'}`}>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='20' height='20' fill='currentColor' className='bi bi-arrow-right-square'>
                    <path fillRule='evenodd' d='M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z'/>
                  </svg>
                  <span className='visually-hidden'>Отправить</span>
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Col>
      {renderModal({ modalInfo, hideModal, setCurrentChannelId })}
    </>
  )
}

export default Chat