import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
  name: string
  sum: number
  save_sum: number
}

const initialState: IUser = {
  name: '',
  save_sum: 0,
  sum: 0
}

const userReducer = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    clearUser(state) {
      state.name = ''
      state.sum = 0
    },

    setName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setSum(state, actioon: PayloadAction<number>) {
      state.sum = actioon.payload >= state.save_sum ? state.save_sum : 0
    },
    setUser(state, action: PayloadAction<IUser>) {
      return action.payload
    }
  }
})

export default userReducer.reducer
export const { clearUser, setSum, setName, setUser } = userReducer.actions
