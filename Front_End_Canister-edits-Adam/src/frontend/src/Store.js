import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/AuthSlice'
import burnReducer from './features/burn/BurnSlice'
import wizardSliceReducer from './features/wizard/WizardSlice'
import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    authReducer: authReducer,
    burnReducer: burnReducer,
    wizardReducer: wizardSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger),
  
})