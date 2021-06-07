import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loggingIn : true,
    loggedIn: false,
    user: {},
    lang: "USen",
    error: null
}

export const login = createAsyncThunk("user/login", async (userCredentials, thunkAPI) => {
    const {loggingIn} = thunkAPI.getState().user
    try {
        const user = await axios.post(`/auth/${loggingIn ? "login" : "register"}`, userCredentials)
        return user.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.request.response)
    }
})

export const getUserSession = createAsyncThunk("user/getUserSession", async () => {
    const user = await axios.get("/api/user")
    return user.data
})

export const logout = createAsyncThunk("user/logout", async () => {
    await axios.post("/auth/logout")
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeLanguage: (state, action) => {
            state.lang = action.payload
        },
        changeIsLoggingIn: state => {
            state.isLoggingIn = !state.isLoggingIn
        }
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.user = action.payload
        },
        [login.rejected]: (state, action) => {
            state.error = action.payload
        },
        [logout.fulfilled]: () => initialState,
        [getUserSession.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.status = "success"
            state.user = action.payload
        },
        [getUserSession.rejected]: () => initialState
    }
})

export const {changeLanguage, changeIsLoggingIn} = userSlice.actions

export const selectLanguage = state => state.user.lang
export const selectUser = state => state.user.user
export const selectError = state => state.user.error
export const selectIsLoggingIn = state => state.user.isLoggingIn
export const selectIsLoggedIn = state => state.user.isLoggedIn
export const selectRegion = state => state.user.user.region

export const selectUserState = state => state.user

export default userSlice.reducer