import { createSlice } from '@reduxjs/toolkit'
import { removeChannel } from './channelsSlice'

//  {body: 'hi hi', channelId: '1', username: 'admin', removable: true, id: '3'}

const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const message = action.payload
      state.messages = [...state.messages, message]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const channelId = action.payload
      const restMessages = state.messages.filter(message => message.channelId !== channelId)
      state.messages = restMessages
    })
  },
})

export const { addMessage } = messagesSlice.actions
export default messagesSlice.reducer
