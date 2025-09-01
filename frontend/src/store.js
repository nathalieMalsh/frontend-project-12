import { configureStore } from "@reduxjs/toolkit"
import authReducer from './slices/authSlice.jsx'
import channelsReducer from './slices/channelsSlice.jsx'

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
  },
})

export default store