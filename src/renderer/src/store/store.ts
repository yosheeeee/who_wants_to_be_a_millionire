import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import { useSelector } from 'react-redux'
import helpersReducer from './helpersReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    helpers: helpersReducer
  }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useTypedSelector = useSelector.withTypes<RootState>()
