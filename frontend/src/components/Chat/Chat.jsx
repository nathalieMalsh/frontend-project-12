import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import routes from '../../routes.js'
import Channels from './Channels.jsx'
import Messages from './Messages.jsx'
import ChatModal from './ChatModal.jsx'

const Chat = () => {
  const channels = useSelector(state => state.channels.channels)

  const userId = useSelector(state => state.auth.userId)
  const token = userId?.token
  const username = userId?.username

  const allMessages = useSelector(state => state.chat.messages || [])

  const [currentChannelId, setCurrentChannelId] = useState('1')
  const [currentChannelChat, setCurrentChannelChat] = useState([])
  const [inputValue, setInputValue] = useState('')

  const [modalInfo, setModalInfo] = useState({ type: null, item: null })

  const showModal = (type, item = null) => setModalInfo({ type, item })
  const hideModal = () => setModalInfo({ type: null, item: null })

  useEffect(() => {
    setCurrentChannelChat(allMessages.filter(message => message.channelId === currentChannelId))
  }, [allMessages, currentChannelId])

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    try {
      const newMessage = { body: inputValue, channelId: currentChannelId, username }
      axios.post(routes.addMessagePath(), newMessage, { headers: { Authorization: `Bearer ${token}` } })
      setInputValue('')
    }
    catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      {/* Список каналов */}
      <Channels
        channels={channels}
        currentChannelId={currentChannelId}
        setCurrentChannelId={setCurrentChannelId}
        showModal={showModal}
      />

      {/* Чат справа */}
      <Messages
        channels={channels}
        currentChannelId={currentChannelId}
        currentChannelChat={currentChannelChat}
        inputValue={inputValue}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <ChatModal modalInfo={modalInfo} hideModal={hideModal} setCurrentChannelId={setCurrentChannelId} />
    </>
  )
}

export default Chat
