import { createSlice, current } from '@reduxjs/toolkit'

//  {body: 'hi hi', channelId: '1', username: 'admin', removable: true, id: '3'}

const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name:'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const message = action.payload
      state.messages = [...state.messages, message]
      
      console.log(current(state))
    },
  },
})

export const { addMessage } = messagesSlice.actions
export default messagesSlice.reducer