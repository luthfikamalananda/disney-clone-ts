import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducer/userSlice'
import movieReducer from '../reducer/movieListSlice'
import movieDetailReducer from '../reducer/movieDetailSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    movieListSlice: movieReducer,
    movieDetailSlice: movieDetailReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch