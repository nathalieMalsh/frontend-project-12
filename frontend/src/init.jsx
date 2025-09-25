import React from 'react'
import { Provider } from 'react-redux'
import { io } from 'socket.io-client'
import store from './store.js'
import { addMessage } from './slices/messagesSlice.jsx'
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.jsx'
import App from './App.jsx'

const socket = io();

socket.on('connect', () => {
  console.log('Соединение с сервером установлено')
})

socket.on('disconnect', () => {
  console.log('Соединение с сервером потеряно')
})

socket.on('newMessage', (payload) => {
  store.dispatch(addMessage(payload))
})

socket.on('newChannel', (payload) => {
  store.dispatch(addChannel(payload))
})

socket.on('removeChannel', (payload) => {
  store.dispatch(removeChannel(payload.id))
})

socket.on('renameChannel', (payload) => {
  store.dispatch(renameChannel(payload))
})

const init = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default init