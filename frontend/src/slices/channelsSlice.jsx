import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  channels: [],
}

const channelsSlice = createSlice({
  name:'channels',
  initialState,
  reducers: {
    addChannels: (state, action) => {
      const channels = action.payload
      state.channels = channels
    },
  },
})

export const { addChannels } = channelsSlice.actions
export default channelsSlice.reducer