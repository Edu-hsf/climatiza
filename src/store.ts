import { configureStore, type Action, type ThunkAction } from '@reduxjs/toolkit'
import locationReducer from './store/locationSlice'
// ...

export const store = configureStore({
  reducer: {
    location: locationReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>