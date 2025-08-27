import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('userId') || null
}

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token } = action.payload
      state.token = token
      localStorage.setItem('userId', token)
    },
    logout: (state) => {
      state.token = null
      localStorage.removeItem('userId')
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer