import { createSlice } from '@reduxjs/toolkit'

const userId = localStorage.getItem('userId')

// userId { token: '', username: '' }

const initialState = {
  userId: userId ? JSON.parse(userId) : null,
}

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const userData = action.payload
      state.userId = userData
      localStorage.setItem('userId', JSON.stringify(userData))
    },
    logout: (state) => {
      state.userId = null
      localStorage.removeItem('userId')
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer