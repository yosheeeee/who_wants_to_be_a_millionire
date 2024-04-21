import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IHelper {
  isDisabled: boolean
  isActive: boolean
  name: string
}

const initialState: IHelper[] = [
  {
    isActive: false,
    isDisabled: true,
    name: 'Помощь зала'
  },
  {
    isActive: false,
    isDisabled: true,
    name: 'Право на ошибку'
  },
  {
    name: 'Звонок другу',
    isDisabled: true,
    isActive: false
  },
  {
    name: '50 на 50',
    isDisabled: true,
    isActive: false
  },
  {
    name: 'Замена вопроса',
    isActive: false,
    isDisabled: true
  }
]

const helpersReducer = createSlice({
  name: 'helpers',
  initialState: initialState,
  reducers: {
    toggleEnableHelper(state, action: PayloadAction<string>) {
      state.map((helper) => {
        if (helper.name == action.payload) {
          helper.isDisabled = !helper.isDisabled
        }
      })
    },

    disableAllHelpers() {
      return initialState
    },

    activateHelper(state, action: PayloadAction<string>) {
      state.map((helper) => {
        if (helper.name == action.payload) {
          helper.isActive = true
        }
      })
    },

    unactivateHelper(state, action: PayloadAction<string>) {
      state.map((helper) => {
        if (helper.name == action.payload) {
          helper.isActive = false
          helper.isDisabled = true
        }
      })
    },
    unactivateAllHelpers(state) {
      state.map((helper) => {
        if (helper.isActive) {
          helper.isActive = false
          helper.isDisabled = true
        }
      })
    }
  }
})

export default helpersReducer.reducer
export const {
  unactivateAllHelpers,
  toggleEnableHelper,
  unactivateHelper,
  disableAllHelpers,
  activateHelper
} = helpersReducer.actions
