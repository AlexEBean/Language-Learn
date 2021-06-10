import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import userReducer from "./slices/userSlice"

export default configureStore({
    reducer: {
        user: userReducer,

    },
    middleware: [thunk]
})