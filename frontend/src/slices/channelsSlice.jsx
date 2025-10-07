import { createSlice } from '@reduxjs/toolkit'

// channels [{id: '1', name: 'general', removable: false}, {id: '2', name: 'random', removable: false}]

const initialState = {
  channels: [],
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    loadChannels: (state, action) => {
      const channels = action.payload
      state.channels = channels
    },
    addChannel: (state, action) => {
      const newChannel = action.payload
      state.channels = [...state.channels, newChannel]
    },
    removeChannel: (state, action) => {
      const channelId = action.payload
      state.channels = state.channels.filter(channel => channel.id !== channelId)
    },
    renameChannel: (state, action) => {
      const renamedChannel = action.payload
      const updatedChannels = state.channels.map((channel) => {
        if (channel.id === renamedChannel.id) {
          return renamedChannel
        }
        return channel
      })
      state.channels = updatedChannels
    },
  },
})

export const { loadChannels, addChannel, removeChannel, renameChannel } = channelsSlice.actions
export default channelsSlice.reducer
