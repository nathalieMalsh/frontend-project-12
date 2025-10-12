import { createSlice } from '@reduxjs/toolkit'

const userId = localStorage.getItem('userId')

// userId { token: '', username: '' }

const initialState = {
  userId: userId ? JSON.parse(userId) : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const userData = action.payload
      state.userId = userData
      localStorage.setItem('userId', JSON.stringify(userData))
    },
    logOut: (state) => {
      state.userId = null
      localStorage.removeItem('userId')
    },
    signUp: (state, action) => {
      const userData = action.payload
      state.userId = userData
      localStorage.setItem('userId', JSON.stringify(userData))
    },
  },
})

export const { loginSuccess, logOut, signUp } = authSlice.actions
export default authSlice.reducer
