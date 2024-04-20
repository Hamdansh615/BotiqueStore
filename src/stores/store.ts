import { configureStore, } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import generalSlice from './generalSlice'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// Create a logger instance
const logger = createLogger({
  collapsed: true, // Collapse log entries by default
});

export const store = configureStore({
    reducer: {
        auth: authReducer,     // Add your reducer here
        general: generalSlice,
    },
    middleware :[thunkMiddleware, logger],
    devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
